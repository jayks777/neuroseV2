from sqlalchemy.orm import Session

from db.models import User
from core.encrypt import hash_password, verify_password
from repositories.user_repository import UserRepository

class AuthService:
    
    @staticmethod
    def create_user(db: Session, data):
        """Cria um novo usuário no banco de dados."""
        
        user_exists = UserRepository.find_by_email(db, data.email)
        
        if user_exists:
            return None

        hashed_password = hash_password(data.password)
        user = User(
            name=data.name, 
            email=data.email, 
            password=hashed_password
        )
        
        return UserRepository.create(db, user)

    @staticmethod
    def authenticate_user(db: Session, email: str, password: str):
        
        user = UserRepository.find_by_email(db, email)
        
        if not user:
            return None
        
        if not verify_password(password, user.password):
            return None
        
        return user

# def create_user(db: Session,data):
#     """Cria um novo usuário no banco de dados."""
    
#     hashed_password = hash_password(data.password)
#     db_user = User(
#         name=data.name, 
#         email=data.email, 
#         password=hashed_password
#     )
    
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user

# def authenticate_user(db: Session, email: str, password: str):
    
#     user = db.query(User).filter(User.email == email).first()
    
#     if not user:
#         return None
    
#     if not verify_password(password, user.password):
#         return None
    
#     return user