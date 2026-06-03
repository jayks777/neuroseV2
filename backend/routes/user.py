#DESATIVADA

from fastapi import APIRouter, Depends
from db import schemas, models
from sqlalchemy.orm import Session

from db.db import get_db

router = APIRouter( tags=["users"], prefix="/user")

#criação de usuário
@router.post("/create", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    
    """Cria um novo usuário no banco de dados."""
    
    usr = db.query(models.User).filter(models.User.email == user.email).first()
    if usr:
        return {"error": "User already exists"}
    else:
        db_user = models.User(name=user.name, email=user.email)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

#leitura de usuários
@router.get("/")
async def read_users(db: Session = Depends(get_db)):
    
    """Retorna uma lista de todos os usuários no banco de dados."""
    
    return db.query(models.User).all()

#leitura de usuário por id
@router.get("/{user_id}")
async def read_user(user_id: int, db: Session = Depends(get_db)):
    
    """Retorna um usuário específico pelo ID."""
    
    return db.query(models.User).filter(models.User.id == user_id).first()

#atualização de usuário
@router.put("/update/{user_id}")
async def update_user(user_id: int, user: schemas.UserCreate, db: Session = Depends(get_db)):
    
    """Atualiza um usuário específico pelo ID."""
    
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        return {"error": "User not found"}
    db_user.name = user.name
    db_user.email = user.email
    db.commit()
    db.refresh(db_user)
    return db_user

#deleção de usuário
@router.delete("/delete/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    
    """Deleta um usuário específico pelo ID."""
    
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        return {"error": "User not found"}
    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}