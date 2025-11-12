
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
      className="bg-white dark:bg-warm-cards rounded-card p-24 shadow-card backdrop-blur-sm border border-overlay overflow-hidden w-full transition-all duration-200"
      whileHover={{
        scale: 1.02,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className={`grid grid-cols-1 md:grid-cols-5 gap-16 items-center`}>
        <div className={`md:col-span-3 ${isReversed ? 'md:order-2' : ''}`}>
            <div className="flex justify-between items-start mb-16">
                <h3 className="text-h3 text-accent">{project.title}</h3>
                {project.github && (
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary dark:text-secondary-dark hover:text-accent transition-colors duration-200 ml-16"
                    aria-label={`View ${project.title} on GitHub`}
                >
                    <GithubIcon className="w-6 h-6" />
                </a>
                )}
            </div>
            <ul className="space-y-8 list-disc list-inside text-primary dark:text-primary-dark">
                {project.impact.map((point, i) => (
                <li key={i}>{point}</li>
                ))}
            </ul>
            <div className="mt-16 flex flex-wrap gap-8">
                {project.tech.map((tech, i) => (
                <span key={i} className="bg-accent/10 text-accent text-caption font-semibold px-12 py-8 rounded-card border border-overlay">
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
        <h2 className="text-h2 text-primary dark:text-primary-dark mb-8">Key Projects & Innovations</h2>
        <div className="h-1 w-24 bg-accent mx-auto mb-40"></div>
        <motion.div
            className="w-full max-w-5xl mx-auto space-y-32"
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