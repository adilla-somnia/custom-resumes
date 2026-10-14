import datetime

from database import Base
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    city = Column(Text, nullable=False)
    linkedin = Column(Text, nullable=True)
    github = Column(Text, nullable=True)
    portfolio = Column(Text, nullable=True)
    kaggle = Column(Text, nullable=True)


class SummaryModel(Base):
    __tablename__ = "summaries"

    id = Column(Integer, primary_key=True, index=True)
    summary = Column(String, nullable=False)


class ExperienceModel(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String, nullable=False)
    city = Column(String, nullable=True)
    role = Column(String, nullable=False)
    start_date = Column(String, nullable=False)
    end_date = Column(String, nullable=True)
    description_1 = Column(Text, nullable=False)
    description_2 = Column(Text, nullable=True)
    description_3 = Column(Text, nullable=True)


class ProjectModel(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    tech_stack = Column(String, nullable=False)
    description_1 = Column(Text, nullable=False)
    description_2 = Column(Text, nullable=True)
    description_3 = Column(Text, nullable=True)
    link_1 = Column(Text, nullable=False)
    link_1_title = Column(Text, nullable=False)
    link_2 = Column(Text, nullable=True)
    link_2_title = Column(Text, nullable=True)
    link_3 = Column(Text, nullable=True)
    link_3_title = Column(Text, nullable=True)


class EducationModel(Base):
    __tablename__ = "educations"

    id = Column(Integer, primary_key=True, index=True)
    institution = Column(String, nullable=False)
    inst_initials = Column(String, nullable=True)
    degree = Column(String, nullable=False)
    start_date = Column(String, nullable=True)
    end_date = Column(String, nullable=True)
    finished = Column(Boolean, nullable=False, default=False)


class CertificateModel(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    institution = Column(String, nullable=False)
    title = Column(String, nullable=False)
    kind = Column(String, nullable=False)
    start_date = Column(String, nullable=True)
    end_date = Column(String, nullable=True)
    finished = Column(Boolean, nullable=False, default=False)

class SkillModel(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, nullable=False)
    items = Column(String, nullable=False)


class LanguageModel(Base):
    __tablename__ = "languages"

    id = Column(Integer, primary_key=True, index=True)
    language = Column(String, nullable=False)
    level = Column(String, nullable=False)


# relationship tables


class ResumeModel(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(
        String, nullable=False
    )  # Nome para procurar o currículo (ex: "Currículo Dados Pleno")
    aimed_position = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now(), nullable=False)

    # Relacionamento com o usuário
    user = relationship("UserModel")

    # Relacionamentos com os blocos através das tabelas de associação (com suporte a ordenação para o Drag and Drop)
    experiences = relationship("ResumeExperienceModel", cascade="all, delete-orphan")
    projects = relationship("ResumeProjectModel", cascade="all, delete-orphan")
    educations = relationship("ResumeEducationModel", cascade="all, delete-orphan")
    certificates = relationship("ResumeCertificateModel", cascade="all, delete-orphan")
    skills = relationship("ResumeSkillModel", cascade="all, delete-orphan")
    languages = relationship("ResumeLanguageModel", cascade="all, delete-orphan")
    # (O Summary pode ser 1 para 1 ou N para 1 se quiser escolher qual resumo usar)
    summary_id = Column(Integer, ForeignKey("summaries.id"), nullable=True)
    summary = relationship("SummaryModel")


# --- TABELAS DE ASSOCIAÇÃO (Com campo 'order' para o Drag and Drop) ---


class ResumeExperienceModel(Base):
    __tablename__ = "resume_experiences"

    resume_id = Column(
        Integer, ForeignKey("resumes.id", ondelete="CASCADE"), primary_key=True
    )
    experience_id = Column(
        Integer, ForeignKey("experiences.id", ondelete="CASCADE"), primary_key=True
    )
    order = Column(
        Integer, default=0, nullable=False
    )  # Posição do item no drag and drop

    experience = relationship("ExperienceModel")


class ResumeProjectModel(Base):
    __tablename__ = "resume_projects"

    resume_id = Column(
        Integer, ForeignKey("resumes.id", ondelete="CASCADE"), primary_key=True
    )
    project_id = Column(
        Integer, ForeignKey("projects.id", ondelete="CASCADE"), primary_key=True
    )
    order = Column(Integer, default=0, nullable=False)

    project = relationship("ProjectModel")


class ResumeEducationModel(Base):
    __tablename__ = "resume_educations"

    resume_id = Column(
        Integer, ForeignKey("resumes.id", ondelete="CASCADE"), primary_key=True
    )
    education_id = Column(
        Integer, ForeignKey("educations.id", ondelete="CASCADE"), primary_key=True
    )
    order = Column(Integer, default=0, nullable=False)

    education = relationship("EducationModel")


class ResumeCertificateModel(Base):
    __tablename__ = "resume_certificates"

    resume_id = Column(
        Integer, ForeignKey("resumes.id", ondelete="CASCADE"), primary_key=True
    )
    certificate_id = Column(
        Integer, ForeignKey("certificates.id", ondelete="CASCADE"), primary_key=True
    )
    order = Column(Integer, default=0, nullable=False)

    certificate = relationship("CertificateModel")


class ResumeSkillModel(Base):
    __tablename__ = "resume_skills"

    resume_id = Column(
        Integer, ForeignKey("resumes.id", ondelete="CASCADE"), primary_key=True
    )
    skill_id = Column(
        Integer, ForeignKey("skills.id", ondelete="CASCADE"), primary_key=True
    )
    order = Column(Integer, default=0, nullable=False)

    skill = relationship("SkillModel")


class ResumeLanguageModel(Base):
    __tablename__ = "resume_languages"

    resume_id = Column(
        Integer, ForeignKey("resumes.id", ondelete="CASCADE"), primary_key=True
    )
    language_id = Column(
        Integer, ForeignKey("languages.id", ondelete="CASCADE"), primary_key=True
    )
    order = Column(Integer, default=0, nullable=False)

    language = relationship("LanguageModel")
