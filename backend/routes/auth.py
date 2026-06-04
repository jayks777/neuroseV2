import os
import time

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy.orm import Session

from core.auth import ACCESS_TOKEN_COOKIE_NAME, get_current_user
from core.encrypt import ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token
from db.db import get_db
from db.models import User as UserModel
from db.schemas import User, UserCreate, UserLogin
from services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

LOGIN_ATTEMPTS: dict[str, list[float]] = {}
LOGIN_RATE_LIMIT_ATTEMPTS = int(os.getenv("LOGIN_RATE_LIMIT_ATTEMPTS", "5"))
LOGIN_RATE_LIMIT_WINDOW_SECONDS = int(
    os.getenv("LOGIN_RATE_LIMIT_WINDOW_SECONDS", "300")
)


def check_login_rate_limit(request: Request, email: str):
    client_host = request.client.host if request.client else "unknown"
    key = f"{client_host}:{email.lower()}"
    now = time.monotonic()
    window_start = now - LOGIN_RATE_LIMIT_WINDOW_SECONDS
    attempts = [
        attempt
        for attempt in LOGIN_ATTEMPTS.get(key, [])
        if attempt >= window_start
    ]

    if len(attempts) >= LOGIN_RATE_LIMIT_ATTEMPTS:
        LOGIN_ATTEMPTS[key] = attempts
        raise HTTPException(
            status_code=429,
            detail="Muitas tentativas de login. Tente novamente mais tarde.",
        )

    attempts.append(now)
    LOGIN_ATTEMPTS[key] = attempts
    return key


@router.post("/register", response_model=User)
def register(data: UserCreate, db: Session = Depends(get_db)):
    user_exists = db.query(UserModel).filter(UserModel.email == data.email).first()

    if user_exists:
        raise HTTPException(status_code=400, detail="Email ja cadastrado")

    user = AuthService.create_user(db, data)
    return user


@router.post("/login")
def login(
    data: UserLogin,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
):
    rate_limit_key = check_login_rate_limit(request, data.email)

    user = AuthService.authenticate_user(db, data.email, data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Credenciais invalidas")

    LOGIN_ATTEMPTS.pop(rate_limit_key, None)

    access_token = create_access_token(data={"sub": user.email})

    response.set_cookie(
        key=ACCESS_TOKEN_COOKIE_NAME,
        value=access_token,
        httponly=True,
        secure=os.getenv("COOKIE_SECURE", "false").lower() == "true",
        samesite=os.getenv("COOKIE_SAMESITE", "lax"),
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )

    return {"message": "Logged in"}


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(key=ACCESS_TOKEN_COOKIE_NAME)
    return {"message": "Logged out"}


@router.get("/me", response_model=User)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
