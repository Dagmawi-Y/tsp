export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  telegramUsername: string;
  githubUrl?: string;
  linkedinUrl?: string;
  currentStatus: string; // Student, Professional, Self-taught, etc.
  projectDescription: string;
  projectLink?: string;
  technicalChallenge?: string; // How they solve problems
  experience: string[];
  whyJoin: string; // Motivation
  canCommit: boolean;
  hoursPerWeek: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  demoLink: string;
  cohort: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
