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

// Vector data types for RAG/chatbot features

export interface SourceMetadata {
  path: string;
  page: number | null;
  section: string | null;
}

export interface Highlight {
  description: string;
  source: SourceMetadata;
}

export interface Timeframe {
  start: string;
  end: string | null;
}

export interface RoleRecord {
  role_id: string;
  title: string;
  company: string;
  location: string;
  timeframe: Timeframe;
  summary: string;
  core_tech: string[];
  highlights: Highlight[];
}

export interface WorkExperiencesData {
  schema_version: string;
  generated_at: string;
  source_document: string;
  roles: RoleRecord[];
}

export interface ChunkMetadata {
  role_id: string;
  company: string;
  title: string;
  location?: string;
  timeframe: Timeframe;
  core_tech: string[];
  chunk_type: 'summary' | 'highlight';
  source_path: string;
  source_page?: number | null;
  source_section?: string | null;
}

export interface VectorChunk {
  chunk_id: string;
  text: string;
  metadata: ChunkMetadata;
}

export interface EmbeddingRecord extends VectorChunk {
  embedding: number[];
}