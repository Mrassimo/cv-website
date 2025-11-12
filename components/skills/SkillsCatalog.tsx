import React, { useState, useEffect } from 'react';
import type { SkillCategory, Skill } from '../../types/skills';
import { getSkillCategories } from '../../utils/skillsLoader';
import { SkillCard } from './SkillCard';
import { SkillDetailModal } from './SkillDetailModal';
import { m } from 'framer-motion';

interface SkillsCatalogProps {
  initialCategory?: string;
  showSearch?: boolean;
  showFilters?: boolean;
}

export const SkillsCatalog: React.FC<SkillsCatalogProps> = ({
  initialCategory,
  showSearch = false,
  showFilters = false,
}) => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory || null);
  const [selectedSkill, setSelectedSkill] = useState<{ skill: Skill; category: SkillCategory } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const cats = await getSkillCategories();
      setCategories(cats);
      if (!activeCategory && cats.length > 0) {
        setActiveCategory(cats[0].id);
      }
    } catch (error) {
      console.error('Failed to load skill categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const activeSkills = activeCategory
    ? categories.find(cat => cat.id === activeCategory)?.skills || []
    : categories.flatMap(cat => cat.skills);

  const activeCategoryData = categories.find(cat => cat.id === activeCategory);

  const handleSkillSelect = (skill: Skill) => {
    const category = categories.find(cat => cat.skills.some(s => s.id === skill.id));
    if (category) {
      setSelectedSkill({ skill, category });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold text-primary mb-4">Skills & Expertise</h2>
        <p className="text-lg text-secondary max-w-2xl mx-auto">
          Comprehensive overview of technical skills, tools, and expertise built over{' '}
          {Math.max(...categories.flatMap(cat => cat.skills).map(s => s.years_experience))}+ years
        </p>
      </m.div>

      {/* Category Tabs */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex gap-2 pb-2 min-w-max">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeCategory === null
                ? 'bg-accent text-white'
                : 'bg-gray-100 text-secondary hover:bg-gray-200'
            }`}
          >
            All Skills
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-secondary hover:bg-gray-200'
              }`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-75">({category.skills.length})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Description */}
      {activeCategoryData && (
        <m.div
          key={activeCategoryData.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 bg-gray-50 rounded-lg"
        >
          <p className="text-sm text-secondary">{activeCategoryData.description}</p>
        </m.div>
      )}

      {/* Skills Grid */}
      <m.div
        key={activeCategory || 'all'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {activeSkills.map((skill, index) => (
          <m.div
            key={skill.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <SkillCard
              skill={skill}
              category={activeCategoryData}
              onSelect={handleSkillSelect}
            />
          </m.div>
        ))}
      </m.div>

      {/* Empty State */}
      {activeSkills.length === 0 && (
        <div className="text-center py-12">
          <p className="text-secondary">No skills found in this category.</p>
        </div>
      )}

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <SkillDetailModal
          skill={selectedSkill.skill}
          category={selectedSkill.category}
          isOpen={true}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
};
