from pydantic import BaseModel, Field, EmailStr

class UserCreate(BaseModel):
    name: str = Field(
        min_length=3,
        max_length=30,
    )
    
    email: EmailStr
    
    password: str = Field(
        min_length=8,
        max_length = 128,
    )
    
class User(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True
        
class UserLogin(BaseModel):
    email: EmailStr
    password: str