
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { PROJECTS } from '../../constants';
import { GithubIcon } from '../ui/Icons';
import type { Project } from '../../types';

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      className="bg-white/5 dark:bg-black/10 rounded-lg p-6 shadow-lg backdrop-blur-sm border border-white/10 dark:border-black/20 overflow-hidden w-full"
      whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(0, 212, 255, 0.1)" }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className={`grid grid-cols-1 md:grid-cols-5 gap-6 items-center`}>
        <div className={`md:col-span-3 ${isReversed ? 'md:order-2' : ''}`}>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-highlight">{project.title}</h3>
                {project.github && (
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary/50 dark:text-accent/50 hover:text-highlight transition-colors ml-4"
                    aria-label={`View ${project.title} on GitHub`}
                >
                    <GithubIcon className="w-6 h-6" />
                </a>
                )}
            </div>
            <ul className="space-y-2 list-disc list-inside text-primary/80 dark:text-accent/80">
                {project.impact.map((point, i) => (
                <li key={i}>{point}</li>
                ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                <span key={i} className="bg-highlight/10 text-highlight text-xs font-semibold px-2 py-1 rounded-full">
                    {tech}
                </span>
                ))}
            </div>
        </div>
        <div className={`md:col-span-2 flex justify-center items-center p-4 ${isReversed ? 'md:order-1' : ''}`}>
            <project.visual className="w-full max-w-[200px] h-auto text-highlight/70" />
        </div>
      </div>
    </motion.div>
  );
};

const listVariants = {
    visible: { transition: { staggerChildren: 0.2 } },
    hidden: {}
}

const itemVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hidden: { opacity: 0, y: 50 }
}

export const ProjectsSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section id="projects" ref={ref}>
      <div className="text-center w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-2">Key Projects & Innovations</h2>
        <div className="h-1 w-24 bg-highlight mx-auto mb-12"></div>
        <motion.div 
            className="w-full max-w-5xl mx-auto space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={listVariants}
        >
          {PROJECTS.map((project, index) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';