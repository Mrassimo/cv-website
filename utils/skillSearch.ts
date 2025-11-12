// Semantic search for skills using keyword matching
// Future: Can be enhanced with vector embeddings like work experiences

import type { Skill, SkillSearchResult } from '../types/skills';
import { getAllSkills, getSkillCategories } from './skillsLoader';

// Calculate relevance score for a skill against a query
function calculateRelevanceScore(skill: Skill, query: string): number {
  const lowerQuery = query.toLowerCase();
  let score = 0;

  // Exact name match (highest weight)
  if (skill.name.toLowerCase() === lowerQuery) {
    score += 100;
  } else if (skill.name.toLowerCase().includes(lowerQuery)) {
    score += 50;
  }

  // Keyword matches
  const keywordMatches = skill.keywords.filter(kw =>
    kw.toLowerCase().includes(lowerQuery)
  ).length;
  score += keywordMatches * 10;

  // Technology matches
  const techMatches = skill.technologies.filter(tech =>
    tech.name.toLowerCase().includes(lowerQuery)
  ).length;
  score += techMatches * 15;

  // Achievement matches
  const achievementMatches = skill.achievements.filter(ach =>
    ach.description.toLowerCase().includes(lowerQuery) ||
    ach.impact?.toLowerCase().includes(lowerQuery)
  ).length;
  score += achievementMatches * 8;

  // Experience highlight matches
  const expMatches = skill.experiences.filter(exp =>
    exp.highlight.toLowerCase().includes(lowerQuery) ||
    exp.company.toLowerCase().includes(lowerQuery)
  ).length;
  score += expMatches * 12;

  // Proficiency bonus (expert skills get slight boost)
  const proficiencyBonus = {
    expert: 5,
    advanced: 3,
    intermediate: 1,
    familiar: 0,
  };
  score += proficiencyBonus[skill.proficiency];

  // Recency bonus (skills used recently get slight boost)
  const lastUsedDate = new Date(skill.last_used);
  const monthsSinceUsed = (Date.now() - lastUsedDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
  if (monthsSinceUsed < 6) score += 3;
  else if (monthsSinceUsed < 12) score += 2;
  else if (monthsSinceUsed < 24) score += 1;

  return score;
}

// Find matching context from a skill
function getMatchingContext(skill: Skill, query: string): string {
  const lowerQuery = query.toLowerCase();

  // Check achievements for matches
  for (const achievement of skill.achievements) {
    if (achievement.description.toLowerCase().includes(lowerQuery)) {
      return achievement.description;
    }
    if (achievement.impact?.toLowerCase().includes(lowerQuery)) {
      return achievement.impact;
    }
  }

  // Check experience highlights
  for (const exp of skill.experiences) {
    if (exp.highlight.toLowerCase().includes(lowerQuery)) {
      return `${exp.company}: ${exp.highlight}`;
    }
  }

  // Check technologies
  const matchingTechs = skill.technologies.filter(tech =>
    tech.name.toLowerCase().includes(lowerQuery)
  );
  if (matchingTechs.length > 0) {
    return `Technologies: ${matchingTechs.map(t => t.name).join(', ')}`;
  }

  // Default to first achievement or skill name
  return skill.achievements[0]?.description || skill.name;
}

// Semantic search for skills
export async function searchSkillsSemantic(
  query: string,
  limit: number = 5
): Promise<SkillSearchResult[]> {
  const skills = await getAllSkills();
  const categories = await getSkillCategories();

  // Calculate relevance scores for all skills
  const scoredSkills = skills
    .map(skill => {
      const score = calculateRelevanceScore(skill, query);
      const category = categories.find(cat =>
        cat.skills.some(s => s.id === skill.id)
      )!;
      const context = getMatchingContext(skill, query);

      return {
        skill,
        category,
        relevance_score: score,
        matching_context: context,
      };
    })
    .filter(result => result.relevance_score > 0) // Only include skills with some relevance
    .sort((a, b) => b.relevance_score - a.relevance_score) // Sort by score
    .slice(0, limit); // Take top N results

  return scoredSkills;
}

// Multi-query search (for complex queries)
export async function searchSkillsMultiQuery(
  queries: string[],
  limit: number = 10
): Promise<SkillSearchResult[]> {
  const allResults: Map<string, SkillSearchResult> = new Map();

  // Search for each query
  for (const query of queries) {
    const results = await searchSkillsSemantic(query, limit);

    for (const result of results) {
      const existing = allResults.get(result.skill.id);

      if (existing) {
        // Combine scores for skills matching multiple queries
        existing.relevance_score += result.relevance_score;
        existing.matching_context += ` | ${result.matching_context}`;
      } else {
        allResults.set(result.skill.id, { ...result });
      }
    }
  }

  // Sort by combined relevance and return top results
  return Array.from(allResults.values())
    .sort((a, b) => b.relevance_score - a.relevance_score)
    .slice(0, limit);
}

// Detect skill-related queries
export function isSkillQuery(query: string): boolean {
  const skillKeywords = [
    'experience with',
    'know about',
    'expertise in',
    'skills in',
    'proficiency',
    'technologies',
    'tools',
    'frameworks',
    'languages',
    'familiar with',
    'worked with',
    'used',
    'knowledge of',
    'capabilities',
    'competencies',
  ];

  const lowerQuery = query.toLowerCase();
  return skillKeywords.some(keyword => lowerQuery.includes(keyword));
}

// Extract potential skill names from a query
export function extractSkillNamesFromQuery(query: string): string[] {
  const commonSkillTerms = [
    'python', 'sql', 'sas', 'javascript', 'typescript', 'react', 'node',
    'aws', 'azure', 'gcp', 'docker', 'kubernetes',
    'snowflake', 'dbt', 'airflow', 'pandas', 'numpy',
    'machine learning', 'ml', 'ai', 'llm', 'rag',
    'tableau', 'power bi', 'looker',
    'terraform', 'ci/cd', 'git',
  ];

  const lowerQuery = query.toLowerCase();
  return commonSkillTerms.filter(term => lowerQuery.includes(term));
}

// Build context for AI Assistant from skill search results
export function buildSkillContext(results: SkillSearchResult[]): string {
  if (results.length === 0) {
    return '';
  }

  const contextParts = results.map(result => {
    const { skill, category } = result;

    const techs = skill.technologies.map(t => t.name).join(', ');
    const companies = [...new Set(skill.experiences.map(e => e.company))].join(', ');
    const topAchievement = skill.achievements[0];

    return `
**${skill.name}** (${skill.proficiency}, ${skill.years_experience} years)
- Category: ${category.name}
- Technologies: ${techs}
- Used at: ${companies}
- Key Achievement: ${topAchievement?.description || 'N/A'}
${topAchievement?.impact ? `- Impact: ${topAchievement.impact}` : ''}
`.trim();
  });

  return `
## Skills & Expertise Context

${contextParts.join('\n\n')}
`.trim();
}
