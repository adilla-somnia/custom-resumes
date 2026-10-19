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
    id: number;
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
    id: number,
    summary: string,
    title: string
}


export interface Education {
    id: number
    institution: string
    inst_initials ?: string
    degree: string
    start_date ?: string
    end_date ?: string
    finished: boolean
}

export interface Certificate {
    id: number
    institution: string
    title: string
    kind: string
    start_date?: string
    end_date?: string
    finished: boolean
}

export interface Skill {
    id: number
    category: string
    items: string
}

export interface Language {
    id: number
    language: string
    level: string
}

export interface Resume {
    id?: number
    aimed_position: string
    title: string
    summary_id: number
    experiences: ItemAssociation[]
    projects: ItemAssociation[]
    user_id: number
}

export interface FullResume {
    id?: number
    aimed_position: string
    title: string
    summary_id: number
    experiences: Experience[]
    projects: Project[]
    user_id: number
    user: User
    summary: Summary
    created_at: string
}

export interface SmallResume {
    id: number,
    aimed_position: string
    title: string
    summary_id: number
    user_id: number
    created_at: string
}

export interface ItemAssociation {
    item_id: number
    order: number
}