
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
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
    <motion.div
      variants={categoryVariants}
      className="bg-white/5 dark:bg-black/10 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-white/10 dark:border-black/20"
    >
      <h3 className="text-xl font-bold text-highlight mb-4">{item.category}</h3>
      <motion.div 
        className="flex flex-wrap gap-4"
        variants={containerVariants}
      >
        {item.skills.map(skill => (
          <motion.div
            key={skill.name}
            variants={skillItemVariants}
            className="flex items-center gap-2 bg-primary/5 dark:bg-accent/5 px-3 py-2 rounded-md"
            whileHover={{ scale: 1.1, color: '#00D4FF' }}
          >
            <skill.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export const SkillsSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section id="skills" ref={ref}>
      <div className="text-center w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-2">Skills & Technologies</h2>
        <div className="h-1 w-24 bg-highlight mx-auto mb-12"></div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto"
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
