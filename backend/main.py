# main.py
import http

from pydantic import BaseModel

from database import engine, get_db
import models
import schemas
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

# Cria as tabelas no arquivo SQLite automaticamente ao iniciar
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Gerenciador de Currículos", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # mudar para url exata do front
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"message": "API de Currículos rodando com sucesso!"}


# ==========================================
# ROTAS PARA ITENS GLOBAIS (Ex: Projetos, Experiências)
# ==========================================

# Função genérica de update
def update_db_item(
    db: Session, model, item_id: int, update_data: dict, mandatory: list
):
    # Busca o item no banco de dados com base no modelo enviado
    db_item = db.query(model).filter(model.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item não encontrado")

    # Atualiza dinamicamente apenas os campos que foram enviados
    for key, value in update_data.items():
        if key in mandatory and value == "":
            raise HTTPException(status_code=400, detail=f"{key} não pode ficar vazio!")
        setattr(db_item, key, value)

    db.commit()
    db.refresh(db_item)
    return db_item


def delete_db_item(db: Session, model, item_id: int):
    db_item = db.query(model).filter(model.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item não encontrado")

    db.delete(db_item)
    db.commit()
    return {"message": f"Item com ID {item_id} deletado com sucesso!"}


@app.post("/users/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.UserModel(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.patch("/users/{user_id}", response_model=schemas.UserResponse)
def update_user(
    user_id: int, user_data: schemas.UserUpdate, db: Session = Depends(get_db)
):
    return update_db_item(
        db, models.UserModel, user_id, user_data.model_dump(exclude_unset=True), ['email', 'full_name', 'phone', 'city']
    )


@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return delete_db_item(db, models.UserModel, user_id)


@app.get("/users/", response_model=list[schemas.UserResponse])
def list_users(db: Session = Depends(get_db)):
    return db.query(models.UserModel).all()


@app.post("/projects/", response_model=schemas.ProjectResponse)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    db_project = models.ProjectModel(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


@app.patch("/projects/{project_id}", response_model=schemas.ProjectResponse)
def update_project(
    project_id: int, project_data: schemas.ProjectUpdate, db: Session = Depends(get_db)
):
    return update_db_item(
        db,
        models.ProjectModel,
        project_id,
        project_data.model_dump(exclude_unset=True),
        ["title", 'tech_stack', 'description_1', 'link_1', 'link_1_title'],
    )


@app.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    return delete_db_item(db, models.ProjectModel, project_id)


@app.get("/projects/", response_model=list[schemas.ProjectResponse])
def list_projects(db: Session = Depends(get_db)):
    return db.query(models.ProjectModel).all()


@app.post("/experiences/", response_model=schemas.ExperienceResponse)
def create_experience(
    experience: schemas.ExperienceCreate, db: Session = Depends(get_db)
):
    db_experience = models.ExperienceModel(**experience.model_dump())
    db.add(db_experience)
    db.commit()
    db.refresh(db_experience)
    return db_experience


@app.patch("/experiences/{experience_id}", response_model=schemas.ExperienceResponse)
def update_experience(
    experience_id: int,
    experience_data: schemas.ExperienceUpdate,
    db: Session = Depends(get_db),
):
    return update_db_item(
        db,
        models.ExperienceModel,
        experience_id,
        experience_data.model_dump(exclude_unset=True),
        ["company", "role", "start_date", "description_1"],
    )


@app.delete("/experiences/{experience_id}")
def delete_experience(experience_id: int, db: Session = Depends(get_db)):
    return delete_db_item(db, models.ExperienceModel, experience_id)


@app.get("/experiences/", response_model=list[schemas.ExperienceResponse])
def list_experiences(db: Session = Depends(get_db)):
    return db.query(models.ExperienceModel).all()


@app.post("/skills/", response_model=schemas.SkillResponse)
def create_skill(
    skill: schemas.SkillCreate, db: Session = Depends(get_db)
):
    db_experience = models.SkillModel(**skill.model_dump())
    db.add(db_experience)
    db.commit()
    db.refresh(db_experience)
    return db_experience


@app.patch("/skills/{skill_id}", response_model=schemas.SkillResponse)
def update_skill(
    skill_id: int,
    skill_data: schemas.SkillUpdate,
    db: Session = Depends(get_db),
):
    return update_db_item(
        db,
        models.SkillModel,
        skill_id,
        skill_data.model_dump(exclude_unset=True),
        ["category", "items"],
    )


@app.delete("/skills/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    return delete_db_item(db, models.SkillModel, skill_id)


@app.get("/skills/", response_model=list[schemas.SkillResponse])
def list_skills(db: Session = Depends(get_db)):
    return db.query(models.SkillModel).all()


@app.post("/educations/", response_model=schemas.EducationResponse)
def create_education(education: schemas.EducationCreate, db: Session = Depends(get_db)):
    db_experience = models.EducationModel(**education.model_dump())
    db.add(db_experience)
    db.commit()
    db.refresh(db_experience)
    return db_experience


@app.patch("/educations/{education_id}", response_model=schemas.EducationResponse)
def update_education(
    education_id: int,
    education_data: schemas.EducationUpdate,
    db: Session = Depends(get_db),
):
    return update_db_item(
        db,
        models.EducationModel,
        education_id,
        education_data.model_dump(exclude_unset=True),
        ["institution", "degree", 'finished'],
    )


@app.delete("/educations/{education_id}")
def delete_education(education_id: int, db: Session = Depends(get_db)):
    return delete_db_item(db, models.EducationModel, education_id)


@app.get("/educations/", response_model=list[schemas.EducationResponse])
def list_educations(db: Session = Depends(get_db)):
    return db.query(models.EducationModel).all()


@app.post("/summaries/", response_model=schemas.SummaryResponse)
def create_summary(summary: schemas.SummaryCreate, db: Session = Depends(get_db)):
    db_experience = models.SummaryModel(**summary.model_dump())
    db.add(db_experience)
    db.commit()
    db.refresh(db_experience)
    return db_experience


@app.patch("/summaries/{summary_id}", response_model=schemas.SummaryResponse)
def update_summary(
    summary_id: int,
    summary_data: schemas.SummaryUpdate,
    db: Session = Depends(get_db),
):
    return update_db_item(
        db,
        models.SummaryModel,
        summary_id,
        summary_data.model_dump(exclude_unset=True),
        ["summary", 'title'],
    )


@app.delete("/summaries/{summary_id}")
def delete_summary(summary_id: int, db: Session = Depends(get_db)):
    return delete_db_item(db, models.SummaryModel, summary_id)


@app.get("/summaries/", response_model=list[schemas.SummaryResponse])
def list_summaries(db: Session = Depends(get_db)):
    return db.query(models.SummaryModel).all()


@app.post("/certificates/", response_model=schemas.CertificateResponse)
def create_certificate(certificate: schemas.CertificateCreate, db: Session = Depends(get_db)):
    db_experience = models.CertificateModel(**certificate.model_dump())
    db.add(db_experience)
    db.commit()
    db.refresh(db_experience)
    return db_experience


@app.patch("/certificates/{certificate_id}", response_model=schemas.CertificateResponse)
def update_certificate(
    certificate_id: int,
    certificate_data: schemas.CertificateUpdate,
    db: Session = Depends(get_db),
):
    return update_db_item(
        db,
        models.CertificateModel,
        certificate_id,
        certificate_data.model_dump(exclude_unset=True),
        ["institution", 'title', 'kind', 'finished'],
    )


@app.delete("/certificates/{certificate_id}")
def delete_certificate(certificate_id: int, db: Session = Depends(get_db)):
    return delete_db_item(db, models.CertificateModel, certificate_id)


@app.get("/certificates/", response_model=list[schemas.CertificateResponse])
def list_certificates(db: Session = Depends(get_db)):
    return db.query(models.CertificateModel).all()


@app.post("/languages/", response_model=schemas.LanguageResponse)
def create_language(
    language: schemas.LanguageCreate, db: Session = Depends(get_db)
):
    db_experience = models.LanguageModel(**language.model_dump())
    db.add(db_experience)
    db.commit()
    db.refresh(db_experience)
    return db_experience


@app.patch("/languages/{language_id}", response_model=schemas.LanguageResponse)
def update_language(
    language_id: int,
    language_data: schemas.LanguageUpdate,
    db: Session = Depends(get_db),
):
    return update_db_item(
        db,
        models.LanguageModel,
        language_id,
        language_data.model_dump(exclude_unset=True),
        ["language", "level"],
    )


@app.delete("/languages/{language_id}")
def delete_language(language_id: int, db: Session = Depends(get_db)):
    return delete_db_item(db, models.LanguageModel, language_id)


@app.get("/languages/", response_model=list[schemas.LanguageResponse])
def list_languages(db: Session = Depends(get_db)):
    return db.query(models.LanguageModel).all()


# ==========================================
# ROTAS DO CURRÍCULO (Com seleção e ordenação)
# ==========================================


@app.post("/resumes/")
def create_resume(resume_data: schemas.ResumeCreate, db: Session = Depends(get_db)):
    # 1. Cria o registro principal do currículo
    db_resume = models.ResumeModel(
        user_id=resume_data.user_id,
        title=resume_data.title,
        summary_id=resume_data.summary_id,
        aimed_position=resume_data.aimed_position
    )
    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)

    # 2. Insere os projetos selecionados com suas respectivas ordens na tabela de associação
    for item in resume_data.projects:
        assoc = models.ResumeProjectModel(
            resume_id=db_resume.id, project_id=item.item_id, order=item.order
        )
        db.add(assoc)

    # 3. Insere as experiências selecionadas com suas respectivas ordens
    for item in resume_data.experiences:
        assoc = models.ResumeExperienceModel(
            resume_id=db_resume.id, experience_id=item.item_id, order=item.order
        )
        db.add(assoc)

    # (O mesmo loop pode ser aplicado para educations, certificates, etc.)

    db.commit()
    return {
        "message": "Currículo criado com sucesso!",
        "resume_id": db_resume.id,
    }


@app.get("/resumes/{resume_id}")
def get_resume(resume_id: int, db: Session = Depends(get_db)):
    resume = (
        db.query(models.ResumeModel).filter(models.ResumeModel.id == resume_id).first()
    )
    if not resume:
        raise HTTPException(status_code=404, detail="Currículo não encontrado")

    # Organizando os dados para retornar ordenados pelo campo 'order' da tabela de associação
    projects_sorted = sorted(resume.projects, key=lambda x: x.order)
    experiences_sorted = sorted(resume.experiences, key=lambda x: x.order)

    return {
        "id": resume.id,
        "title": resume.title,
        "created_at": resume.created_at,
        "user": resume.user,
        "summary": resume.summary,
        "projects": [assoc.project for assoc in projects_sorted],
        "experiences": [assoc.experience for assoc in experiences_sorted],
    }
