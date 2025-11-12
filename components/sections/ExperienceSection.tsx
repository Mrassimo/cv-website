
import React, { forwardRef, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Section } from '../ui/Section';
import { EXPERIENCES } from '../../constants';
import type { Experience } from '../../types';

const TimelineItem: React.FC<{ experience: Experience; isLast: boolean }> = ({ experience, isLast }) => {
  return (
    <div className="relative pl-32 pb-32">
      {!isLast && <div className="absolute left-[1.5px] top-5 h-full w-0.5 bg-overlay"></div>}
      <motion.div
        className="absolute left-[-7px] top-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ type: 'spring', stiffness: 300, duration: 0.2 }}
      >
        <div className="w-4 h-4 rounded-full bg-accent"/>
      </motion.div>
      <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.2 }}
      >
        <p className="text-caption font-semibold text-accent">{experience.period}</p>
        <h3 className="text-h3 text-primary dark:text-primary-dark mt-8">{experience.role}</h3>
        <div className="flex items-center gap-8 mt-8">
           <experience.logo className="w-5 h-5 text-secondary dark:text-secondary-dark flex-shrink-0" />
           <h4 className="font-semibold text-body text-secondary dark:text-secondary-dark">{experience.company} &bull; {experience.location}</h4>
        </div>
        <ul className="mt-16 space-y-8 list-disc list-inside text-body text-primary dark:text-primary-dark">
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
        <h2 className="text-h2 text-primary dark:text-primary-dark text-center mb-8">Professional Experience</h2>
        <div className="h-1 w-24 bg-accent mx-auto mb-40"></div>
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