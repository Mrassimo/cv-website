// TypeScript types for Skills Inventory System
// Mirrors the schema in data/skills/skills_inventory.json

export interface SkillInventory {
  version: string;
  generated_at: string;
  categories: SkillCategory[];
}

export interface SkillCategory {
  id: string;                    // "programming-languages"
  name: string;                  // "Programming, Languages & Algorithms"
  description: string;           // Category description
  order: number;                 // Display order
  skills: Skill[];              // Skills in this category
}

export interface Skill {
  id: string;                    // "python-scientific-stack"
  name: string;                  // "Python & Scientific Stack"
  proficiency: Proficiency;
  technologies: Technology[];
  experiences: ExperienceLink[]; // Links to work experiences
  achievements: Achievement[];
  keywords: string[];            // For search
  last_used: string;             // ISO date format
  years_experience: number;
}

export type Proficiency = "expert" | "advanced" | "intermediate" | "familiar";

export interface Technology {
  name: string;                  // "Pandas", "Docker", etc.
  category: string;              // "library" | "framework" | "platform" | "tool" | "language" | "service" | etc.
  context?: string;              // Optional: where/how it was used
}

export interface ExperienceLink {
  role_id: string;               // Links to work_experiences.json
  company: string;               // Company name
  highlight: string;             // Specific achievement/usage
  timeframe: Timeframe;
}

export interface Timeframe {
  start: string;                 // "YYYY-MM" format
  end: string | null;            // null for current roles
}

export interface Achievement {
  description: string;           // Achievement description
  impact?: string;               // Quantified impact
  metrics?: Metric[];            // Quantified metrics
}

export interface Metric {
  type: MetricType;
  value: string;                 // "99%", "400%", "$2M+", "3.17M", etc.
  context: string;               // What the metric measures
}

export type MetricType = "performance" | "cost" | "time" | "scale" | "test_coverage";

// Utility types for search and filtering

export interface SkillSearchResult {
  skill: Skill;
  category: SkillCategory;
  relevance_score: number;
  matching_context: string;
}

export interface SkillFilters {
  categories?: string[];         // Category IDs to filter by
  proficiency?: Proficiency[];   // Proficiency levels to filter by
  technologies?: string[];       // Technology names to filter by
  companies?: string[];          // Company names to filter by
  dateRange?: {
    start: string;
    end: string;
  } | null;
  yearsExperience?: {
    min: number;
    max: number;
  };
}

export interface TechnologyIndex {
  [techName: string]: {
    skill_ids: string[];
    skills: Skill[];
    experience_count: number;
    first_used: string;
    last_used: string;
    category: string;
  };
}

export interface SkillMapping {
  experience_to_skills: {
    [role_id: string]: {
      primary_skills: string[];    // Core skills for this role
      secondary_skills: string[];  // Supporting skills
      skill_growth: string[];      // New skills learned
    };
  };
  skill_to_experiences: {
    [skill_id: string]: string[];  // role_ids where skill was used
  };
  technology_index: {
    [tech_name: string]: {
      skill_ids: string[];
      experience_count: number;
      first_used: string;
      last_used: string;
    };
  };
}

// Type guards for runtime type checking

export function isProficiency(value: string): value is Proficiency {
  return ["expert", "advanced", "intermediate", "familiar"].includes(value);
}

export function isMetricType(value: string): value is MetricType {
  return ["performance", "cost", "time", "scale", "test_coverage"].includes(value);
}

// Helper types for UI components

export interface SkillCardProps {
  skill: Skill;
  category?: SkillCategory;
  onSelect?: (skill: Skill) => void;
  compact?: boolean;
}

export interface SkillDetailModalProps {
  skill: Skill;
  category: SkillCategory;
  isOpen: boolean;
  onClose: () => void;
}

export interface SkillsCatalogProps {
  initialCategory?: string;
  showSearch?: boolean;
  showFilters?: boolean;
}

// Constants for skill system

export const PROFICIENCY_LEVELS: { value: Proficiency; label: string; color: string }[] = [
  { value: "expert", label: "Expert", color: "#10B981" },      // green
  { value: "advanced", label: "Advanced", color: "#3B82F6" },  // blue
  { value: "intermediate", label: "Intermediate", color: "#F59E0B" }, // amber
  { value: "familiar", label: "Familiar", color: "#6B7280" },  // gray
];

export const METRIC_ICONS: Record<MetricType, string> = {
  performance: "⚡",
  cost: "💰",
  time: "⏱️",
  scale: "📊",
  test_coverage: "✅",
};
