// Shared TypeScript interfaces for Sanity data types

export interface Profile {
  firstName?: string;
  lastName?: string;
  name?: string;
  bio?: string;
  shortBio?: string;
  email?: string;
  phone?: string;
  location?: string;
  availability?: string;
  headline?: string;
  headlineStaticText?: string;
  headlineAnimatedWords?: string[];
  headlineAnimationDuration?: number;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  profileImage?: any;
  stats?: ProfileStat[];
  yearsOfExperience?: number;
}

export interface ProfileStat {
  label: string;
  value: string;
  icon?: string;
}

export interface Skill {
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: any;
  featured?: boolean;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  achievements?: string[];
  gpa?: string;
  location?: string;
  logo?: any;
  fieldOfStudy?: string;
  current?: boolean;
  website?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  category?: string;
}
