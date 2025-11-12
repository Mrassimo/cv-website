import React from 'react';
import type { Skill, SkillCategory } from '../../types/skills';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { m } from 'framer-motion';

interface SkillCardProps {
  skill: Skill;
  category?: SkillCategory;
  onSelect?: (skill: Skill) => void;
  compact?: boolean;
}

const PROFICIENCY_COLORS: Record<string, string> = {
  expert: 'bg-green-500 text-white',
  advanced: 'bg-blue-500 text-white',
  intermediate: 'bg-amber-500 text-white',
  familiar: 'bg-gray-500 text-white',
};

const PROFICIENCY_LABELS: Record<string, string> = {
  expert: 'Expert',
  advanced: 'Advanced',
  intermediate: 'Intermediate',
  familiar: 'Familiar',
};

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  category,
  onSelect,
  compact = false,
}) => {
  const proficiencyColor = PROFICIENCY_COLORS[skill.proficiency] || PROFICIENCY_COLORS.familiar;
  const proficiencyLabel = PROFICIENCY_LABELS[skill.proficiency] || skill.proficiency;

  const topAchievement = skill.achievements[0];
  const companies = [...new Set(skill.experiences.map(exp => exp.company))];
  const techCount = skill.technologies.length;
  const displayTechs = compact ? skill.technologies.slice(0, 4) : skill.technologies;

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)' }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect?.(skill)}>
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-primary">{skill.name}</h3>
            <Badge className={`${proficiencyColor} text-xs px-2 py-1`}>
              {proficiencyLabel}
            </Badge>
          </div>
          {category && (
            <p className="text-xs text-secondary">{category.name}</p>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Technologies */}
          <div>
            <p className="text-xs font-medium text-secondary mb-2">Technologies</p>
            <div className="flex flex-wrap gap-1.5">
              {displayTechs.map((tech, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs px-2 py-0.5 bg-gray-50"
                >
                  {tech.name}
                </Badge>
              ))}
              {compact && techCount > 4 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 bg-gray-50">
                  +{techCount - 4} more
                </Badge>
              )}
            </div>
          </div>

          {/* Experience Context */}
          {companies.length > 0 && (
            <div>
              <p className="text-xs font-medium text-secondary mb-1">Used at</p>
              <p className="text-sm text-gray-700">{companies.join(', ')}</p>
            </div>
          )}

          {/* Years of Experience */}
          <div className="flex items-center gap-4 text-xs text-secondary">
            <span>📅 {skill.years_experience} years</span>
            <span>🕐 Last used: {new Date(skill.last_used).getFullYear()}</span>
          </div>

          {/* Top Achievement */}
          {!compact && topAchievement && (
            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs font-medium text-secondary mb-1">Key Achievement</p>
              <p className="text-sm text-gray-700 line-clamp-2">
                {topAchievement.description}
              </p>
              {topAchievement.impact && (
                <p className="text-xs text-accent mt-1 font-medium">
                  {topAchievement.impact}
                </p>
              )}
            </div>
          )}

          {/* View Details Button */}
          {onSelect && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-accent hover:text-accent hover:bg-accent/10"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(skill);
              }}
            >
              View details →
            </Button>
          )}
        </CardContent>
      </Card>
    </m.div>
  );
};
