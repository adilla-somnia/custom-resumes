import axios from 'axios';
import type { Certificate, Education, Experience, Language, Project, Skill, Summary, User } from '../types';

export const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// PROJECTS
export const getProjects = async () => {
  const response = await api.get<Project[]>('/projects/');
  return response.data;
};

export const createProject = async (data: Omit<Project, 'id'>) => {
  const response = await api.post<Project>('/projects/', data);
  console.log("WHAT")
  return response.data;
};

export const updateProject = async (id: number, data: Partial<Project>) => {
  const response = await api.patch<Project>(`/projects/${id}`, data);
  return response.data;
};

export const deleteProject = async (id: number) => {
  await api.delete(`/projects/${id}`);
};

// EXPERIENCES
export const getExperiences = async () => {
  const response = await api.get<Experience[]>('/experiences/');
  return response.data;
};

export const createExperience = async (data: Omit<Experience, 'id'>) => {
  const response = await api.post<Experience>('/experiences/', data);
  return response.data;
};

export const updateExperience = async (id: number, data: Partial<Experience>) => {
  const response = await api.patch<Experience>(`/experiences/${id}`, data);
  return response.data;
};

export const deleteExperience = async (id: number) => {
  await api.delete(`/experiences/${id}`);
};

// CERTIFICATES
export const getCertificates = async () => {
  const response = await api.get<Certificate[]>('/certificates/');
  return response.data;
};

export const createCertificate = async (data: Omit<Certificate, 'id'>) => {
  const response = await api.post<Certificate>('/certificates/', data);
  return response.data;
};

export const updateCertificate = async (id: number, data: Partial<Certificate>) => {
  const response = await api.patch<Certificate>(`/certificates/${id}`, data);
  return response.data;
};

export const deleteCertificate = async (id: number) => {
  await api.delete(`/certificates/${id}`);
};

// USERS
export const getUsers = async () => {
  const response = await api.get<User[]>('/users/');
  return response.data;
};

export const createUser = async (data: Omit<User, 'id'>) => {
  const response = await api.post<User>('/users/', data);
  return response.data;
};

export const updateUser = async (id: number, data: Partial<User>) => {
  const response = await api.patch<User>(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`);
};

// EDUCATIONS

export const getEducations = async () => {
  const response = await api.get<Education[]>('/educations/');
  return response.data;
};

export const createEducation = async (data: Omit<Education, 'id'>) => {
  const response = await api.post<Education>('/educations/', data);
  return response.data;
};

export const updateEducation = async (id: number, data: Partial<Education>) => {
  const response = await api.patch<Education>(`/educations/${id}`, data);
  return response.data;
};

export const deleteEducation = async (id: number) => {
  await api.delete(`/educations/${id}`);
};

// SKILLS
export const getSkills = async () => {
  const response = await api.get<Skill[]>('/skills/');
  return response.data;
};

export const createSkill = async (data: Omit<Skill, 'id'>) => {
  const response = await api.post<Skill>('/skills/', data);
  return response.data;
};

export const updateSkill = async (id: number, data: Partial<Skill>) => {
  const response = await api.patch<Skill>(`/skills/${id}`, data);
  return response.data;
};

export const deleteSkill = async (id: number) => {
  await api.delete(`/skills/${id}`);
};

// LANGUAGES
export const getLanguages = async () => {
  const response = await api.get<Language[]>('/languages/');
  return response.data;
};

export const createLanguage = async (data: Omit<Language, 'id'>) => {
  const response = await api.post<Language>('/languages/', data);
  return response.data;
};

export const updateLanguage = async (id: number, data: Partial<Language>) => {
  const response = await api.patch<Language>(`/languages/${id}`, data);
  return response.data;
};

export const deleteLanguage = async (id: number) => {
  await api.delete(`/languages/${id}`);
};

// SUMMARIES
export const getSummaries = async () => {
  const response = await api.get<Summary[]>('/summaries/');
  return response.data;
};

export const createSummary = async (data: Omit<Summary, 'id'>) => {
  const response = await api.post<Summary>('/summaries/', data);
  return response.data;
};

export const updateSummary = async (id: number, data: Partial<Summary>) => {
  const response = await api.patch<Summary>(`/summaries/${id}`, data);
  return response.data;
};

export const deleteSummary = async (id: number) => {
  await api.delete(`/summaries/${id}`);
};