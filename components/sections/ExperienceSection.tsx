
import React, { forwardRef, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Section } from '../ui/Section';
import { EXPERIENCES } from '../../constants';
import type { Experience } from '../../types';

const TimelineItem: React.FC<{ experience: Experience; isLast: boolean }> = ({ experience, isLast }) => {
  return (
    <div className="relative pl-8 sm:pl-12 pb-12">
      {!isLast && <div className="absolute left-[1.5px] top-5 h-full w-0.5 bg-primary/20 dark:bg-accent/20"></div>}
      <motion.div 
        className="absolute left-[-7px] top-1 w-6 h-6 rounded-full bg-accent dark:bg-primary flex items-center justify-center"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="w-4 h-4 rounded-full bg-highlight"/>
      </motion.div>
      <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
      >
        <p className="text-sm font-semibold text-highlight">{experience.period}</p>
        <h3 className="text-xl font-bold mt-1">{experience.role}</h3>
        <div className="flex items-center gap-2 mt-1">
           <experience.logo className="w-5 h-5 text-primary/60 dark:text-accent/60 flex-shrink-0" />
           <h4 className="font-semibold text-primary/80 dark:text-accent/80">{experience.company} &bull; {experience.location}</h4>
        </div>
        <ul className="mt-4 space-y-2 list-disc list-inside text-primary/70 dark:text-accent/70">
          {experience.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export const ExperienceSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section id="experience" ref={ref}>
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-2">Professional Experience</h2>
        <div className="h-1 w-24 bg-highlight mx-auto mb-12"></div>
        <div className="relative">
          {EXPERIENCES.map((exp, index) => (
            <TimelineItem key={index} experience={exp} isLast={index === EXPERIENCES.length - 1} />
          ))}
        </div>
      </div>
    </Section>
  );
});

ExperienceSection.displayName = 'ExperienceSection';