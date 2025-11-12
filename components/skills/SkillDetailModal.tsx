import React from 'react';
import type { Skill, SkillCategory } from '../../types/skills';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { m } from 'framer-motion';

interface SkillDetailModalProps {
  skill: Skill;
  category: SkillCategory;
  isOpen: boolean;
  onClose: () => void;
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

const METRIC_ICONS: Record<string, string> = {
  performance: '⚡',
  cost: '💰',
  time: '⏱️',
  scale: '📊',
  test_coverage: '✅',
};

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({
  skill,
  category,
  isOpen,
  onClose,
}) => {
  const proficiencyColor = PROFICIENCY_COLORS[skill.proficiency] || PROFICIENCY_COLORS.familiar;
  const proficiencyLabel = PROFICIENCY_LABELS[skill.proficiency] || skill.proficiency;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-primary mb-2">
                {skill.name}
              </DialogTitle>
              <p className="text-sm text-secondary">{category.name}</p>
            </div>
            <Badge className={`${proficiencyColor} text-sm px-3 py-1 ml-4`}>
              {proficiencyLabel}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-secondary mb-1">Years Experience</p>
              <p className="text-lg font-semibold text-primary">{skill.years_experience}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-secondary mb-1">Last Used</p>
              <p className="text-lg font-semibold text-primary">
                {new Date(skill.last_used).getFullYear()}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-secondary mb-1">Technologies</p>
              <p className="text-lg font-semibold text-primary">{skill.technologies.length}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-secondary mb-1">Companies</p>
              <p className="text-lg font-semibold text-primary">
                {new Set(skill.experiences.map(e => e.company)).size}
              </p>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">Technologies & Tools</h3>
            <div className="flex flex-wrap gap-2">
              {skill.technologies.map((tech, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="px-3 py-1 bg-gray-50"
                >
                  <span className="font-medium">{tech.name}</span>
                  <span className="text-xs text-secondary ml-2">({tech.category})</span>
                </Badge>
              ))}
            </div>
          </div>

          {/* Achievements */}
          {skill.achievements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">Key Achievements</h3>
              <div className="space-y-4">
                {skill.achievements.map((achievement, idx) => (
                  <m.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border-l-4 border-accent pl-4 py-2"
                  >
                    <p className="text-gray-700 mb-2">{achievement.description}</p>
                    {achievement.impact && (
                      <p className="text-sm text-accent font-medium mb-2">
                        💡 {achievement.impact}
                      </p>
                    )}
                    {achievement.metrics && achievement.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {achievement.metrics.map((metric, mIdx) => (
                          <Badge
                            key={mIdx}
                            className="bg-accent/10 text-accent border-accent/20"
                          >
                            {METRIC_ICONS[metric.type] || '📈'} {metric.value} {metric.context}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </m.div>
                ))}
              </div>
            </div>
          )}

          {/* Experience Timeline */}
          {skill.experiences.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">Experience Timeline</h3>
              <div className="space-y-3">
                {skill.experiences
                  .sort((a, b) => {
                    // Sort by start date, most recent first
                    if (a.timeframe.end === null) return -1;
                    if (b.timeframe.end === null) return 1;
                    return b.timeframe.start.localeCompare(a.timeframe.start);
                  })
                  .map((exp, idx) => (
                    <m.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-gray-50 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-primary">{exp.company}</h4>
                        <span className="text-xs text-secondary">
                          {exp.timeframe.start} - {exp.timeframe.end || 'Present'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{exp.highlight}</p>
                    </m.div>
                  ))}
              </div>
            </div>
          )}

          {/* Keywords */}
          {skill.keywords.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-secondary mb-2">Related Keywords</h3>
              <div className="flex flex-wrap gap-1.5">
                {skill.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
