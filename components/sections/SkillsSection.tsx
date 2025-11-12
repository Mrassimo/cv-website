
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { SKILLS } from '../../constants';
import type { SkillCategory } from '../../types';

const containerVariants = {
  visible: { transition: { staggerChildren: 0.1 } },
  hidden: {},
};

const categoryVariants = {
  visible: { opacity: 1, x: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } },
  hidden: { opacity: 0, x: -50 },
};

const skillItemVariants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
};

const SkillCategoryCard: React.FC<{ item: SkillCategory }> = ({ item }) => {
  return (
    <Card asChild>
      <motion.div
        variants={categoryVariants}
        className="cursor-pointer"
        whileHover={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
      >
        <CardHeader>
          <CardTitle>{item.category}</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            className="flex flex-wrap gap-8"
            variants={containerVariants}
          >
            {item.skills.map(skill => (
              <Badge key={skill.name} variant="default" asChild>
                <motion.div
                  variants={skillItemVariants}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <skill.icon className="w-5 h-5 text-accent" />
                  <span>{skill.name}</span>
                </motion.div>
              </Badge>
            ))}
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  );
};

export const SkillsSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section id="skills" ref={ref}>
      <div className="text-center w-full">
        <h2 className="text-h2 text-primary dark:text-primary-dark mb-8">Skills & Technologies</h2>
        <div className="h-1 w-24 bg-accent mx-auto mb-40"></div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32 w-full max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {SKILLS.map((categoryItem) => (
             <SkillCategoryCard key={categoryItem.category} item={categoryItem} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
});

SkillsSection.displayName = 'SkillsSection';
