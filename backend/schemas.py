# schemas.py
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr

# ==========================================
# 1. SCHEMAS DE CRIAÇÃO DOS ITENS GLOBAIS
# ==========================================


class UserCreate(BaseModel):
    full_name: str
    email: str
    phone: str
    city: str
    linkedin: Optional[str] = None
    github: Optional[str] = None
    portfolio: Optional[str] = None
    kaggle: Optional[str] = None


class SummaryCreate(BaseModel):
    summary: str
    title: str


class ExperienceCreate(BaseModel):
    company: str
    city: Optional[str] = None
    role: str
    start_date: str
    end_date: Optional[str] = None
    description_1: str
    description_2: Optional[str] = None
    description_3: Optional[str] = None


class ProjectCreate(BaseModel):
    title: str
    tech_stack: str
    description_1: str
    description_2: Optional[str] = None
    description_3: Optional[str] = None
    link_1: str
    link_1_title: str
    link_2: Optional[str] = None
    link_2_title: Optional[str] = None
    link_3: Optional[str] = None
    link_3_title: Optional[str] = None


class EducationCreate(BaseModel):
    institution: str
    inst_initials: Optional[str] = None
    degree: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    finished: bool = False


class CertificateCreate(BaseModel):
    institution: str
    title: str
    kind: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    finished: bool = False


class SkillCreate(BaseModel):
    category: str
    items: str


class LanguageCreate(BaseModel):
    language: str
    level: str


# ==========================================
# 2. SCHEMAS PARA SELEÇÃO E ORDENAÇÃO NO CURRÍCULO
# ==========================================
# Quando o usuário escolhe quais itens vão para o currículo e a posição deles (Drag and Drop)


class ItemAssociation(BaseModel):
    item_id: int  # ID do projeto, experiência, etc. no banco global
    order: int  # Posição na lista para o drag and drop


class ResumeCreate(BaseModel):
    user_id: int
    aimed_position: str
    title: str  # Nome identificador do currículo (ex: "Currículo Dados Pleno")
    summary_id: Optional[int] = None

    # Listas contendo os IDs selecionados e suas respectivas ordens
    experiences: List[ItemAssociation] = []
    projects: List[ItemAssociation] = []
    educations: List[ItemAssociation] = []
    certificates: List[ItemAssociation] = []
    skills: List[ItemAssociation] = []
    languages: List[ItemAssociation] = []


# ==========================================
# 3. SCHEMAS DE RESPOSTA (OUTPUT PARA O REACT)
# ==========================================


class UserResponse(UserCreate):
    id: int

    class Config:
        from_attributes = True


class SummaryResponse(SummaryCreate):
    id: int

    class Config:
        from_attributes = True


class ExperienceResponse(ExperienceCreate):
    id: int

    class Config:
        from_attributes = True


class ProjectResponse(ProjectCreate):
    id: int

    class Config:
        from_attributes = True


class EducationResponse(EducationCreate):
    id: int

    class Config:
        from_attributes = True


class CertificateResponse(CertificateCreate):
    id: int

    class Config:
        from_attributes = True


class SkillResponse(SkillCreate):
    id: int

    class Config:
        from_attributes = True


class LanguageResponse(LanguageCreate):
    id: int

    class Config:
        from_attributes = True


# Schema detalhado do Currículo já populado com os dados reais para o Front-end renderizar
class ResumeDetailResponse(BaseModel):
    id: int
    title: str
    aimed_position: str
    created_at: datetime
    user: UserResponse
    summary: Optional[SummaryResponse] = None

    # Em vez de retornar apenas o ID, retornamos o objeto completo ordenado
    experiences: List = []
    projects: List = []
    educations: List = []
    certificates: List = []
    skills: List = []
    languages: List = []

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    aimed_position: Optional[str] = None
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    portfolio: Optional[str] = None
    kaggle: Optional[str] = None


class SummaryUpdate(BaseModel):
    summary: Optional[str] = None
    title: Optional[str] = None


class ExperienceUpdate(BaseModel):
    company: Optional[str] = None
    city: Optional[str] = None
    role: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description_1: Optional[str] = None
    description_2: Optional[str] = None
    description_3: Optional[str] = None


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    tech_stack: Optional[str] = None
    description_1: Optional[str] = None
    description_2: Optional[str] = None
    description_3: Optional[str] = None
    link_1: Optional[str] = None
    link_1_title: Optional[str] = None
    link_2: Optional[str] = None
    link_2_title: Optional[str] = None
    link_3: Optional[str] = None
    link_3_title: Optional[str] = None


class EducationUpdate(BaseModel):
    institution: Optional[str] = None
    inst_initials: Optional[str] = None
    degree: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    finished: Optional[bool]


class CertificateUpdate(BaseModel):
    institution: Optional[str] = None
    title: Optional[str] = None
    kind: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    finished: Optional[str]


class SkillUpdate(BaseModel):
    category: Optional[str] = None
    items: Optional[str] = None


class LanguageUpdate(BaseModel):
    language: Optional[str] = None
    level: Optional[str] = None
