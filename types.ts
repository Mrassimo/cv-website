// Fix: Import React to provide types for React.FC and React.SVGProps.
import React from 'react';

export interface Project {
  id: string;
  title: string;
  impact: string[];
  tech: string[];
  github?: string;
  visual: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
}