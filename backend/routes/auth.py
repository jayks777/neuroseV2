from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.schemas import UserLogin, User, UserCreate
from db.db import get_db
from services.auth_service import create_user, authenticate_user
from core.encrypt import create_access_token
from core.auth import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.post("/register", response_model=User)
def register(data: UserCreate, db: Session = Depends(get_db)):
    
    user_exists = (db.query(User).filter(User.email == data.email).first())
    
    if user_exists:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    
    user = create_user(db, data)
    return user

@router.post("/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user(db, data.email, data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    
    access_token = create_access_token(data={"sub": user.email})
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=User)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user