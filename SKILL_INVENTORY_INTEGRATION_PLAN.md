# Comprehensive Skill Inventory Integration Plan

## Executive Summary

**Goal:** Transform the comprehensive skill inventory into a searchable, queryable, and maintainable system integrated with the portfolio website and AI Assistant.

**Approach:** 3-phase implementation
1. **Phase 1 (MVP):** Data structure + basic display + RAG integration
2. **Phase 2:** Admin interface + enhanced search
3. **Phase 3:** Advanced features + analytics

**Timeline:**
- Phase 1: 2-3 days
- Phase 2: 3-4 days
- Phase 3: 5-7 days

---

## Current State Analysis

### What We Have
✅ Work experience vector embeddings (2.6 MB)
✅ AI Assistant with Gemini integration
✅ Basic RAG for work history queries
✅ Static content in constants.ts
✅ Rich skill inventory document (markdown)

### What We Need
❌ Structured skill data storage
❌ Skill-to-experience mapping
❌ Input interface for new skills
❌ Enhanced RAG with skill context
❌ UI for skill exploration
❌ Search/filter capabilities

---

## Phase 1: Foundation (MVP) - 2-3 Days

### 1.1 Data Schema Design

**File Structure:**
```
/data/
├── skills/
│   ├── skills_inventory.json          # Master skill catalog
│   ├── skills_chunks.jsonl            # Searchable skill chunks
│   ├── skills_embeddings.jsonl        # Vector embeddings
│   └── skill_mappings.json            # Skill→Experience links
└── vector/
    └── [existing work experience files]
```

**Schema: `skills_inventory.json`**
```typescript
interface SkillInventory {
  version: string;
  generated_at: string;
  categories: SkillCategory[];
}

interface SkillCategory {
  id: string;                    // "programming-languages"
  name: string;                  // "Programming, Languages & Algorithms"
  description: string;
  order: number;
  skills: Skill[];
}

interface Skill {
  id: string;                    // "python-scientific-stack"
  name: string;                  // "Python & Scientific Stack"
  proficiency: "expert" | "advanced" | "intermediate" | "familiar";
  technologies: Technology[];
  experiences: ExperienceLink[]; // Which roles used this skill
  achievements: Achievement[];
  keywords: string[];            // For search
  last_used: string;             // Date
  years_experience: number;
}

interface Technology {
  name: string;                  // "Pandas"
  category: string;              // "library" | "framework" | "platform"
  context?: string;              // Where/how it was used
}

interface ExperienceLink {
  role_id: string;               // Link to work_experiences.json
  company: string;
  highlight: string;             // Specific achievement
  timeframe: { start: string; end?: string };
}

interface Achievement {
  description: string;
  impact?: string;               // Quantified impact
  metrics?: Metric[];
}

interface Metric {
  type: "performance" | "cost" | "time" | "scale";
  value: string;                 // "99%", "400%", "$2M+"
  context: string;
}
```

**Schema: `skill_mappings.json`**
```typescript
interface SkillMapping {
  experience_to_skills: {
    [role_id: string]: {
      primary_skills: string[];    // Core skills for this role
      secondary_skills: string[];  // Supporting skills
      skill_growth: string[];      // New skills learned
    }
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
    }
  };
}
```

### 1.2 Data Extraction Pipeline

**Script: `scripts/parse-skill-inventory.ts`**
```typescript
// Parses markdown skill inventory into JSON schema
// Extracts:
// - Categories from headers (##)
// - Skills from bullets/sub-bullets
// - Technologies from inline mentions
// - Achievements with metrics (numbers, %, $)
// - Links to experiences by company name matching

// Output:
// - skills_inventory.json
// - skill_mappings.json
```

**Script: `scripts/generate-skill-embeddings.ts`**
```typescript
// Takes skills_inventory.json
// Chunks each skill into searchable text
// Generates embeddings using OpenAI/Gemini
// Outputs:
// - skills_chunks.jsonl
// - skills_embeddings.jsonl

// Chunking strategy:
// - One chunk per skill + context
// - Include: name, description, technologies, achievements
// - Max 512 tokens per chunk
```

### 1.3 TypeScript Types

**File: `types/skills.ts`**
```typescript
export interface SkillInventory {
  version: string;
  generated_at: string;
  categories: SkillCategory[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  order: number;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  proficiency: "expert" | "advanced" | "intermediate" | "familiar";
  technologies: Technology[];
  experiences: ExperienceLink[];
  achievements: Achievement[];
  keywords: string[];
  last_used: string;
  years_experience: number;
}

// ... other interfaces
```

### 1.4 Data Utilities

**File: `utils/skillsLoader.ts`**
```typescript
import skillsData from '@/data/skills/skills_inventory.json';

export function getSkillCategories(): SkillCategory[] {
  return skillsData.categories;
}

export function getSkillById(skillId: string): Skill | undefined {
  for (const category of skillsData.categories) {
    const skill = category.skills.find(s => s.id === skillId);
    if (skill) return skill;
  }
  return undefined;
}

export function searchSkills(query: string): Skill[] {
  // Search by name, keywords, technologies
}

export function getSkillsByCategory(categoryId: string): Skill[] {
  // Filter skills by category
}

export function getSkillsByExperience(roleId: string): Skill[] {
  // Get skills used in specific role
}

export function getTechnologyIndex(): Map<string, Technology[]> {
  // Build index of all technologies
}
```

**File: `utils/skillSearch.ts`**
```typescript
// Semantic search for skills
export async function searchSkillsSemantic(
  query: string,
  limit: number = 5
): Promise<SkillSearchResult[]> {
  // 1. Get query embedding
  // 2. Search skills_embeddings.jsonl
  // 3. Return relevant skills with context
}

export interface SkillSearchResult {
  skill: Skill;
  relevance_score: number;
  matching_context: string;
  related_experiences: ExperienceLink[];
}
```

### 1.5 UI Components (Basic)

**Component: `components/skills/SkillsCatalog.tsx`**
```typescript
// Main skills showcase page
// Features:
// - Category tabs
// - Skill cards with proficiency badges
// - Technology chips
// - "Used at [Company]" links
// - Collapsible achievement lists

export const SkillsCatalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>();
  const categories = getSkillCategories();

  return (
    <div className="max-w-7xl mx-auto py-12">
      {/* Category navigation */}
      <CategoryTabs
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Skill grid */}
      <SkillGrid
        skills={getSkillsByCategory(activeCategory)}
      />
    </div>
  );
};
```

**Component: `components/skills/SkillCard.tsx`**
```typescript
export const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <h3>{skill.name}</h3>
          <ProficiencyBadge level={skill.proficiency} />
        </div>
      </CardHeader>
      <CardContent>
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skill.technologies.map(tech => (
            <Badge key={tech.name}>{tech.name}</Badge>
          ))}
        </div>

        {/* Experience links */}
        <div className="text-sm text-secondary mb-4">
          Used at: {skill.experiences.map(exp => exp.company).join(', ')}
        </div>

        {/* Top achievement */}
        {skill.achievements[0] && (
          <p className="text-sm">{skill.achievements[0].description}</p>
        )}

        {/* View details button */}
        <Button variant="ghost" onClick={() => openSkillModal(skill)}>
          View details →
        </Button>
      </CardContent>
    </Card>
  );
};
```

**Component: `components/skills/SkillDetailModal.tsx`**
```typescript
// Full-screen modal with:
// - Complete skill description
// - All technologies
// - Full achievement list with metrics
// - Timeline of experiences
// - Related skills
```

### 1.6 RAG Integration

**Update: `hooks/useGemini.ts`**
```typescript
import { searchSkillsSemantic } from '@/utils/skillSearch';
import { getFullPortfolioText } from '@/constants';

export const generateResponse = async (prompt: string) => {
  // 1. Detect if query is skill-related
  const isSkillQuery = detectSkillQuery(prompt); // "What experience with X", "Tell me about Y skills"

  // 2. Search both work history AND skills
  const workContext = await searchWorkExperiences(prompt);
  const skillContext = isSkillQuery
    ? await searchSkillsSemantic(prompt, 3)
    : [];

  // 3. Build enhanced context
  const context = `
## Work Experience Context
${workContext}

## Skills & Expertise Context
${skillContext.map(s => `
**${s.skill.name}** (${s.skill.proficiency})
- Technologies: ${s.skill.technologies.map(t => t.name).join(', ')}
- Used at: ${s.skill.experiences.map(e => e.company).join(', ')}
- Key Achievement: ${s.skill.achievements[0]?.description || 'N/A'}
`).join('\n')}
`;

  // 4. Generate response with full context
  return await gemini.generateResponse(prompt, context);
};

function detectSkillQuery(prompt: string): boolean {
  const skillKeywords = [
    'experience with', 'know about', 'expertise in',
    'skills in', 'proficiency', 'technologies',
    'tools', 'frameworks', 'languages'
  ];
  return skillKeywords.some(kw =>
    prompt.toLowerCase().includes(kw)
  );
}
```

### 1.7 Navigation Updates

**Update: `constants.ts`**
```typescript
export const SECTIONS = [
  { id: 'home', title: 'Home' },
  { id: 'about', title: 'Who I Am' },
  { id: 'aspirations', title: 'Aspirations' },
  { id: 'projects', title: 'Key Projects' },
  { id: 'skills', title: 'Skills' },        // Existing
  { id: 'expertise', title: 'Expertise' },  // NEW - Comprehensive catalog
  { id: 'experience', title: 'Experience' },
  { id: 'personal', title: 'Personal' },
  { id: 'contact', title: 'Contact' },
];
```

**Add new section to `App.tsx`**
```typescript
import { ExpertiseSection } from './components/sections/ExpertiseSection';

// In render:
<ExpertiseSection ref={(el) => { sectionRefs.current[5] = el; }} />
```

---

## Phase 2: Admin Interface - 3-4 Days

### 2.1 Content Management System

**Component: `components/admin/SkillAdminPanel.tsx`**
```typescript
// Protected admin interface (password/auth)
// Features:
// - Add new skill
// - Edit existing skill
// - Link skill to experience
// - Add achievement with metrics
// - Preview changes
// - Export to JSON

// Security: Only accessible via env variable password
```

**Component: `components/admin/SkillForm.tsx`**
```typescript
interface SkillFormData {
  name: string;
  category: string;
  proficiency: string;
  technologies: string[];
  experiences: { roleId: string; highlight: string }[];
  achievements: { description: string; impact?: string }[];
  keywords: string[];
}

export const SkillForm: React.FC<{
  skill?: Skill;
  onSave: (data: SkillFormData) => void;
}> = ({ skill, onSave }) => {
  // Rich form with:
  // - Dropdowns for category/proficiency
  // - Multi-select for technologies (with autocomplete)
  // - Experience linker (search existing roles)
  // - Dynamic achievement list
  // - Keyword tag input
  // - Validation
  // - Preview pane
};
```

### 2.2 Markdown Import Tool

**Script: `scripts/import-markdown-skills.ts`**
```typescript
// Takes markdown file (like the one you provided)
// Uses LLM to parse and structure
// Outputs JSON ready for review
// Admin can review + approve before adding to inventory

// Usage:
// npm run import-skills path/to/skill-inventory.md

// Process:
// 1. Parse markdown structure
// 2. Send to Gemini with schema prompt
// 3. Generate structured JSON
// 4. Validate against TypeScript types
// 5. Save to temp file for review
// 6. Admin approves → merge into skills_inventory.json
```

**Gemini Prompt Template:**
```
You are a structured data extraction assistant. Parse the following skill inventory
markdown into the specified JSON schema. Extract:

1. Skill categories from ## headers
2. Individual skills from bullet points
3. Technologies/tools mentioned (in bold or specific contexts)
4. Achievements with quantified metrics (%, $, numbers)
5. Company/role associations

Schema: [JSON schema here]

Markdown content:
[Skill inventory markdown]

Output valid JSON matching the schema. Preserve all metrics and context.
```

### 2.3 API Endpoints (Optional)

**File: `pages/api/skills/add.ts`** (if using Next.js API routes)
```typescript
// POST /api/skills/add
// Accepts JSON skill data
// Validates
// Adds to skills_inventory.json
// Regenerates embeddings
// Returns new skill ID

// Security: API key authentication
```

**File: `pages/api/skills/search.ts`**
```typescript
// POST /api/skills/search
// Accepts query string
// Returns semantic search results
// Used by admin interface for testing
```

### 2.4 Bulk Operations

**Script: `scripts/regenerate-embeddings.ts`**
```typescript
// Regenerates all skill embeddings
// Usage: npm run regenerate-embeddings
// Useful after bulk edits
```

**Script: `scripts/validate-skills.ts`**
```typescript
// Validates skills_inventory.json against schema
// Checks:
// - All role_ids exist in work_experiences.json
// - No duplicate skill IDs
// - All required fields present
// - Proficiency levels valid
// - Date formats correct

// Usage: npm run validate-skills
```

---

## Phase 3: Advanced Features - 5-7 Days

### 3.1 Enhanced Search Interface

**Component: `components/skills/AdvancedSkillSearch.tsx`**
```typescript
export const AdvancedSkillSearch: React.FC = () => {
  const [filters, setFilters] = useState<SkillFilters>({
    categories: [],
    proficiency: [],
    technologies: [],
    companies: [],
    dateRange: null,
  });

  return (
    <div>
      {/* Search bar with AI-powered suggestions */}
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search skills: 'Python for healthcare', 'SAS expertise', etc."
      />

      {/* Multi-facet filters */}
      <FilterPanel filters={filters} onChange={setFilters} />

      {/* Results with relevance scoring */}
      <SearchResults results={results} />

      {/* Saved searches */}
      <SavedSearches />
    </div>
  );
};
```

### 3.2 Skill Timeline Visualization

**Component: `components/skills/SkillTimeline.tsx`**
```typescript
// Interactive timeline showing:
// - When each skill was first used
// - Proficiency growth over time
// - Skills by role/company
// - Skill acquisition rate

// Uses Framer Motion for animations
// D3.js or Recharts for visualization
```

### 3.3 Technology Stack View

**Component: `components/skills/TechnologyStackView.tsx`**
```typescript
// Visual representation of entire tech stack
// Organized by:
// - Category (Data Platforms, AI/ML, Cloud, etc.)
// - Proficiency (expert → familiar)
// - Frequency of use
// - Recent vs legacy

// Interactive:
// - Click tech → see skills using it
// - Filter by category
// - Search
// - Export as image/PDF
```

### 3.4 Skill Recommendations

**Feature: Related Skills**
```typescript
// For each skill, show:
// - Complementary skills (often used together)
// - Prerequisite skills
// - Next-level skills
// - Industry-standard combinations

export function getRelatedSkills(skillId: string): RelatedSkills {
  // Uses embeddings + co-occurrence analysis
  // Returns: { complements, prerequisites, advanced, combinations }
}
```

### 3.5 Analytics Dashboard

**Component: `components/admin/SkillAnalytics.tsx`**
```typescript
// Admin-only analytics:
// - Most queried skills
// - Search patterns
// - Skill coverage gaps
// - AI Assistant query success rate
// - Popular technology combinations
// - Skill utilization by role

// Integrates with analytics.ts
```

### 3.6 Export Capabilities

**Feature: Generate Resume Sections**
```typescript
export function generateResumeSection(
  skills: string[], // skill IDs to include
  format: 'markdown' | 'latex' | 'html' | 'pdf'
): string {
  // Auto-generates formatted resume sections
  // Based on selected skills
  // Includes relevant achievements
  // Grouped intelligently
  // Formatted for target system
}

// Usage: Admin panel → Select skills → Generate → Download
```

### 3.7 Supabase Vector DB Migration

**Follow `VECTOR_DB_OPTIMIZATION.md` but for skills:**

```sql
-- Supabase table for skills
CREATE TABLE skill_embeddings (
  id TEXT PRIMARY KEY,
  skill_id TEXT NOT NULL,
  category TEXT NOT NULL,
  text TEXT NOT NULL,
  embedding VECTOR(3072),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ON skill_embeddings
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 50);
```

**Benefits:**
- No 2.6 MB download for skills
- Instant semantic search
- Scalable to 1000+ skills
- Combined work history + skills queries

---

## Implementation Roadmap

### Week 1: Foundation
**Days 1-2:**
- [ ] Design and finalize data schema
- [ ] Create TypeScript types
- [ ] Build data extraction pipeline
- [ ] Parse existing skill inventory
- [ ] Generate initial JSON files

**Day 3:**
- [ ] Create data utilities (skillsLoader.ts, skillSearch.ts)
- [ ] Build basic UI components (SkillCard, SkillsCatalog)
- [ ] Integrate with existing site navigation

### Week 2: RAG & Admin
**Days 4-5:**
- [ ] Generate skill embeddings
- [ ] Integrate with AI Assistant
- [ ] Test semantic search
- [ ] Enhance Gemini context with skills

**Days 6-7:**
- [ ] Build admin panel
- [ ] Create skill input form
- [ ] Add markdown import tool
- [ ] Test bulk operations

### Week 3: Polish & Advanced Features
**Days 8-10:**
- [ ] Advanced search interface
- [ ] Skill timeline visualization
- [ ] Technology stack view
- [ ] Related skills algorithm

**Days 11-12:**
- [ ] Analytics dashboard
- [ ] Export capabilities
- [ ] Supabase migration (optional)
- [ ] Documentation

---

## Technical Architecture

### Data Flow
```
┌─────────────────────────┐
│ Markdown Skill Inventory│
└───────────┬─────────────┘
            │
            ↓
┌───────────────────────────┐
│ Parse & Structure Script   │
│ (LLM-assisted extraction) │
└───────────┬───────────────┘
            │
            ↓
┌──────────────────────────────┐
│ skills_inventory.json         │
│ skill_mappings.json           │
└───────────┬──────────────────┘
            │
            ↓
┌──────────────────────────────┐
│ Generate Embeddings Script    │
└───────────┬──────────────────┘
            │
            ↓
┌──────────────────────────────┐
│ skills_embeddings.jsonl       │
└───────────┬──────────────────┘
            │
            ├─────────────────────────┐
            │                         │
            ↓                         ↓
┌──────────────────┐      ┌──────────────────┐
│ Website UI        │      │ AI Assistant      │
│ - Skill Catalog   │      │ - Semantic Search │
│ - Search          │      │ - Context Builder │
│ - Timeline        │      │ - Query Handler   │
└──────────────────┘      └──────────────────┘
```

### Component Hierarchy
```
App.tsx
├── ExpertiseSection
│   ├── SkillsCatalog
│   │   ├── CategoryTabs
│   │   └── SkillGrid
│   │       └── SkillCard
│   │           └── SkillDetailModal
│   └── AdvancedSkillSearch
│       ├── SearchBar
│       ├── FilterPanel
│       └── SearchResults
└── AiAssistant (enhanced with skill context)
```

---

## Data Schema Files

### File: `data/skills/skills_inventory.json` (sample)
```json
{
  "version": "1.0.0",
  "generated_at": "2025-01-15T00:00:00Z",
  "categories": [
    {
      "id": "programming-languages",
      "name": "Programming, Languages & Algorithms",
      "description": "Core programming languages and computational techniques",
      "order": 1,
      "skills": [
        {
          "id": "python-scientific-stack",
          "name": "Python & Scientific Stack",
          "proficiency": "expert",
          "technologies": [
            { "name": "Pandas", "category": "library" },
            { "name": "Polars", "category": "library" },
            { "name": "NumPy", "category": "library" },
            { "name": "scikit-learn", "category": "framework" },
            { "name": "TensorFlow", "category": "framework" },
            { "name": "Pydantic", "category": "library" }
          ],
          "experiences": [
            {
              "role_id": "hcf-senior-insights-analyst",
              "company": "HCF",
              "highlight": "Built geocoding engine processing 3.17M records with Pandas/Polars",
              "timeframe": { "start": "2024-10", "end": null }
            },
            {
              "role_id": "westpac-financial-crime",
              "company": "Westpac Group",
              "highlight": "ML feature engineering for fraud detection pipelines",
              "timeframe": { "start": "2022-10", "end": "2024-07" }
            }
          ],
          "achievements": [
            {
              "description": "Processed 3.17M+ records with custom geocoding framework",
              "impact": "92.4% match rate on complex Australian addresses",
              "metrics": [
                { "type": "scale", "value": "3.17M", "context": "records processed" },
                { "type": "performance", "value": "92.4%", "context": "match rate" }
              ]
            },
            {
              "description": "Built Pydantic validation framework for data quality",
              "impact": "Zero schema drift incidents in production"
            }
          ],
          "keywords": [
            "python", "pandas", "polars", "numpy", "data science",
            "machine learning", "scikit-learn", "tensorflow", "pydantic",
            "data processing", "feature engineering"
          ],
          "last_used": "2025-01-15",
          "years_experience": 8
        }
      ]
    }
  ]
}
```

### File: `data/skills/skill_mappings.json` (sample)
```json
{
  "experience_to_skills": {
    "hcf-senior-insights-analyst": {
      "primary_skills": [
        "python-scientific-stack",
        "snowflake-platform",
        "sas-ecosystem",
        "data-quality-engineering"
      ],
      "secondary_skills": [
        "dbt-framework",
        "sql-mastery",
        "api-integration"
      ],
      "skill_growth": [
        "snowflake-snowpark",
        "data-vault-2"
      ]
    }
  },
  "skill_to_experiences": {
    "python-scientific-stack": [
      "hcf-senior-insights-analyst",
      "westpac-financial-crime",
      "medibank-senior-reporting"
    ]
  },
  "technology_index": {
    "Pandas": {
      "skill_ids": ["python-scientific-stack", "data-engineering-python"],
      "experience_count": 5,
      "first_used": "2017-03",
      "last_used": "2025-01-15"
    }
  }
}
```

---

## Testing Strategy

### Unit Tests
```typescript
// utils/__tests__/skillsLoader.test.ts
describe('skillsLoader', () => {
  test('loads all skill categories', () => {
    const categories = getSkillCategories();
    expect(categories.length).toBeGreaterThan(0);
  });

  test('finds skill by ID', () => {
    const skill = getSkillById('python-scientific-stack');
    expect(skill).toBeDefined();
    expect(skill?.name).toBe('Python & Scientific Stack');
  });

  test('searches skills by keyword', () => {
    const results = searchSkills('python');
    expect(results.length).toBeGreaterThan(0);
  });
});
```

### Integration Tests
```typescript
// AI Assistant skill query tests
describe('AI Assistant Skill Queries', () => {
  test('answers skill proficiency questions', async () => {
    const response = await generateResponse(
      "What experience does Massimo have with Python?"
    );
    expect(response).toContain('expert');
    expect(response).toContain('Pandas');
  });

  test('links skills to experiences', async () => {
    const response = await generateResponse(
      "Tell me about SAS expertise at HCF"
    );
    expect(response).toContain('HCF');
    expect(response).toContain('SAS');
  });
});
```

---

## Migration Path

### From Current State
1. ✅ Keep existing work_experiences.json
2. ✅ Add skills_inventory.json alongside
3. ✅ Link skills to experiences via role_id
4. ✅ Enhance AI Assistant with both contexts
5. ✅ Add new Skills section to website

### Data Relationships
```
work_experiences.json    skills_inventory.json
        |                        |
        |                        |
        └────────────┬───────────┘
                     |
              skill_mappings.json
                     |
                     ↓
              AI Assistant
           (unified context)
```

---

## Success Metrics

### Phase 1 (MVP)
- [ ] Skills inventory parsed and structured
- [ ] Basic UI showing all skills
- [ ] AI Assistant can answer skill queries
- [ ] Search returns relevant skills

### Phase 2 (Admin)
- [ ] Can add new skill via UI in <5 minutes
- [ ] Markdown import works with 90%+ accuracy
- [ ] Validation catches schema errors

### Phase 3 (Advanced)
- [ ] Advanced search finds skills in <1 second
- [ ] Timeline visualization loads smoothly
- [ ] Export generates usable resume sections
- [ ] Supabase queries return in <100ms

---

## Cost Estimate

### Development Time
- Phase 1: 16-24 hours
- Phase 2: 24-32 hours
- Phase 3: 40-56 hours
**Total:** ~80-112 hours (2-3 weeks full-time equivalent)

### Infrastructure
- **Current setup:** $0 (static hosting)
- **With Supabase (optional):** $0-25/month
- **Embedding generation (one-time):** ~$5 (OpenAI API)
- **Ongoing:** $0-5/month (Gemini API for admin imports)

---

## Next Steps

### Immediate (This Week)
1. **Review and approve this plan**
2. **Finalize data schema** (iterate on JSON structure)
3. **Start Phase 1 implementation**

### To Decide
- Admin panel: Web UI vs CLI vs API?
- Vector DB: Client-side vs Supabase?
- Import method: LLM-assisted vs manual?
- Authentication: For admin panel?

### Questions for You
1. Do you prefer a web admin panel or CLI tools for managing skills?
2. Should we migrate to Supabase immediately or keep client-side search for MVP?
3. Do you want the skill inventory to be publicly visible or gated?
4. Are there specific skill categories or structures you want different from what I proposed?

---

**Ready to proceed?** Let me know if you want me to start with Phase 1 implementation, or if you'd like to adjust the plan first!
