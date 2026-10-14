export interface Project {
  id: number;
  title: string;
  tech_stack: string;
  description_1: string;
  description_2?: string;
  description_3?: string;
  link_1: string;
  link_1_title: string;
  link_2?: string;
  link_2_title?: string;
  link_3?: string;
  link_3_title?: string;
}

export interface Experience {
  id: number;
  company: string;
  city?: string;
  role: string;
  start_date: string;
  end_date?: string;
  description_1: string;
  description_2?: string;
  description_3?: string;
}


export interface User {
    full_name: string
    email: string
    phone: string
    city: string
    linkedin ?: string
    github ?: string
    portfolio ?: string
    kaggle ?: string
}


export interface Summary {
    summary: string
}


export interface Education {
    institution: string
    inst_initials ?: string
    degree: string
    start_date ?: string
    end_date ?: string
    finished: boolean
}

export interface Certificate {
    institution: string
    title: string
    kind: string
    start_date?: string
    end_date?: string
    finished: boolean
}

export interface Skill {
    category: string
    items: string
}

export interface Language {
    language: string
    level: string
}