from fastapi import APIRouter, Depends
from db import schemas
from core.auth import get_current_user

router = APIRouter( tags=["users"], prefix="/user")

@router.get("/profile")
def get_user_profile(current_user: schemas.User = Depends(get_current_user)):
    '''Retorna dados do perfil do usuário autenticado'''
    return {"username": current_user.name, "email": current_user.email}