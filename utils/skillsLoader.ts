// Skills data loader and utility functions
import type {
  SkillInventory,
  SkillCategory,
  Skill,
  SkillFilters,
  TechnologyIndex,
  Proficiency,
} from '../types/skills';

// Lazy load skills data
let skillsCache: SkillInventory | null = null;

export async function getSkillsData(): Promise<SkillInventory> {
  if (skillsCache) {
    return skillsCache;
  }

  try {
    const response = await fetch('/data/skills/skills_inventory.json');
    if (!response.ok) {
      throw new Error('Failed to load skills inventory');
    }
    skillsCache = await response.json();
    return skillsCache;
  } catch (error) {
    console.error('Error loading skills data:', error);
    throw error;
  }
}

// Get all skill categories
export async function getSkillCategories(): Promise<SkillCategory[]> {
  const data = await getSkillsData();
  return data.categories.sort((a, b) => a.order - b.order);
}

// Get a specific category by ID
export async function getCategoryById(categoryId: string): Promise<SkillCategory | undefined> {
  const categories = await getSkillCategories();
  return categories.find(cat => cat.id === categoryId);
}

// Get all skills across all categories
export async function getAllSkills(): Promise<Skill[]> {
  const categories = await getSkillCategories();
  return categories.flatMap(cat => cat.skills);
}

// Get a specific skill by ID
export async function getSkillById(skillId: string): Promise<{ skill: Skill; category: SkillCategory } | undefined> {
  const categories = await getSkillCategories();

  for (const category of categories) {
    const skill = category.skills.find(s => s.id === skillId);
    if (skill) {
      return { skill, category };
    }
  }

  return undefined;
}

// Get all skills in a specific category
export async function getSkillsByCategory(categoryId: string): Promise<Skill[]> {
  const category = await getCategoryById(categoryId);
  return category?.skills || [];
}

// Get skills by proficiency level
export async function getSkillsByProficiency(proficiency: Proficiency): Promise<Skill[]> {
  const skills = await getAllSkills();
  return skills.filter(skill => skill.proficiency === proficiency);
}

// Get skills used in a specific role/experience
export async function getSkillsByExperience(roleId: string): Promise<Skill[]> {
  const skills = await getAllSkills();
  return skills.filter(skill =>
    skill.experiences.some(exp => exp.role_id === roleId)
  );
}

// Get skills by company
export async function getSkillsByCompany(company: string): Promise<Skill[]> {
  const skills = await getAllSkills();
  return skills.filter(skill =>
    skill.experiences.some(exp =>
      exp.company.toLowerCase().includes(company.toLowerCase())
    )
  );
}

// Search skills by keyword (searches name, keywords, technologies)
export async function searchSkills(query: string): Promise<Skill[]> {
  const skills = await getAllSkills();
  const lowerQuery = query.toLowerCase();

  return skills.filter(skill => {
    // Search in skill name
    if (skill.name.toLowerCase().includes(lowerQuery)) return true;

    // Search in keywords
    if (skill.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))) return true;

    // Search in technologies
    if (skill.technologies.some(tech =>
      tech.name.toLowerCase().includes(lowerQuery)
    )) return true;

    // Search in achievements
    if (skill.achievements.some(ach =>
      ach.description.toLowerCase().includes(lowerQuery) ||
      ach.impact?.toLowerCase().includes(lowerQuery)
    )) return true;

    // Search in experiences
    if (skill.experiences.some(exp =>
      exp.highlight.toLowerCase().includes(lowerQuery) ||
      exp.company.toLowerCase().includes(lowerQuery)
    )) return true;

    return false;
  });
}

// Advanced filtering
export async function filterSkills(filters: SkillFilters): Promise<Skill[]> {
  let skills = await getAllSkills();

  // Filter by categories
  if (filters.categories && filters.categories.length > 0) {
    const categorySkills: Skill[] = [];
    for (const catId of filters.categories) {
      const catSkills = await getSkillsByCategory(catId);
      categorySkills.push(...catSkills);
    }
    skills = categorySkills;
  }

  // Filter by proficiency
  if (filters.proficiency && filters.proficiency.length > 0) {
    skills = skills.filter(skill =>
      filters.proficiency!.includes(skill.proficiency)
    );
  }

  // Filter by technologies
  if (filters.technologies && filters.technologies.length > 0) {
    skills = skills.filter(skill =>
      skill.technologies.some(tech =>
        filters.technologies!.some(filterTech =>
          tech.name.toLowerCase().includes(filterTech.toLowerCase())
        )
      )
    );
  }

  // Filter by companies
  if (filters.companies && filters.companies.length > 0) {
    skills = skills.filter(skill =>
      skill.experiences.some(exp =>
        filters.companies!.some(filterCompany =>
          exp.company.toLowerCase().includes(filterCompany.toLowerCase())
        )
      )
    );
  }

  // Filter by years of experience
  if (filters.yearsExperience) {
    const { min, max } = filters.yearsExperience;
    skills = skills.filter(skill =>
      skill.years_experience >= min && skill.years_experience <= max
    );
  }

  // Filter by date range
  if (filters.dateRange) {
    skills = skills.filter(skill =>
      skill.last_used >= filters.dateRange!.start &&
      skill.last_used <= filters.dateRange!.end
    );
  }

  return skills;
}

// Build technology index
export async function getTechnologyIndex(): Promise<TechnologyIndex> {
  const skills = await getAllSkills();
  const index: TechnologyIndex = {};

  for (const skill of skills) {
    for (const tech of skill.technologies) {
      if (!index[tech.name]) {
        index[tech.name] = {
          skill_ids: [],
          skills: [],
          experience_count: 0,
          first_used: skill.last_used,
          last_used: skill.last_used,
          category: tech.category,
        };
      }

      index[tech.name].skill_ids.push(skill.id);
      index[tech.name].skills.push(skill);
      index[tech.name].experience_count = skill.experiences.length;

      // Update date ranges
      if (skill.last_used > index[tech.name].last_used) {
        index[tech.name].last_used = skill.last_used;
      }

      // Calculate first_used from experiences
      const firstExp = skill.experiences.reduce((earliest, exp) => {
        return exp.timeframe.start < earliest ? exp.timeframe.start : earliest;
      }, skill.last_used);

      if (firstExp < index[tech.name].first_used) {
        index[tech.name].first_used = firstExp;
      }
    }
  }

  return index;
}

// Get skills sorted by proficiency (expert first)
export async function getSkillsByProficiencyOrder(): Promise<Skill[]> {
  const skills = await getAllSkills();
  const proficiencyOrder: Record<Proficiency, number> = {
    expert: 0,
    advanced: 1,
    intermediate: 2,
    familiar: 3,
  };

  return skills.sort((a, b) =>
    proficiencyOrder[a.proficiency] - proficiencyOrder[b.proficiency]
  );
}

// Get recently used skills (within last N months)
export async function getRecentSkills(months: number = 12): Promise<Skill[]> {
  const skills = await getAllSkills();
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - months);
  const cutoffStr = cutoffDate.toISOString().split('T')[0];

  return skills.filter(skill => skill.last_used >= cutoffStr);
}

// Get skill statistics
export async function getSkillStatistics() {
  const skills = await getAllSkills();
  const categories = await getSkillCategories();
  const techIndex = await getTechnologyIndex();

  return {
    total_skills: skills.length,
    total_categories: categories.length,
    total_technologies: Object.keys(techIndex).length,
    by_proficiency: {
      expert: skills.filter(s => s.proficiency === 'expert').length,
      advanced: skills.filter(s => s.proficiency === 'advanced').length,
      intermediate: skills.filter(s => s.proficiency === 'intermediate').length,
      familiar: skills.filter(s => s.proficiency === 'familiar').length,
    },
    average_years_experience:
      skills.reduce((sum, s) => sum + s.years_experience, 0) / skills.length,
    most_common_technologies: Object.entries(techIndex)
      .sort((a, b) => b[1].skill_ids.length - a[1].skill_ids.length)
      .slice(0, 10)
      .map(([name, data]) => ({ name, count: data.skill_ids.length })),
  };
}

// Clear cache (useful for testing or after updates)
export function clearSkillsCache(): void {
  skillsCache = null;
}
