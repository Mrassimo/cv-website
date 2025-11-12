import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { PERSONAL_INFO } from '../../constants';
import { GithubIcon, EnvelopeIcon, LinkedinIcon } from '../ui/Icons';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const ContactSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section id="contact" ref={ref}>
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2 variants={itemVariants} className="text-h2 text-primary dark:text-primary-dark mb-8">Let's Build Data Worlds</motion.h2>
        <motion.div variants={itemVariants} className="h-1 w-24 bg-accent mx-auto mb-40"></motion.div>
        <motion.p variants={itemVariants} className="max-w-xl mx-auto text-body text-secondary dark:text-secondary-dark mb-32">
          I'm always excited to connect with like-minded professionals and explore new opportunities in the world of data and AI. Feel free to reach out.
        </motion.p>
        <motion.div variants={itemVariants} className="flex justify-center items-center gap-16 mb-40">
           <a href={`mailto:${PERSONAL_INFO.email}`} className="text-body font-semibold text-primary dark:text-primary-dark hover:text-accent transition-colors duration-200">{PERSONAL_INFO.email}</a>
        </motion.div>
        <motion.div variants={itemVariants} className="flex justify-center items-center gap-32">
            <motion.a href={`mailto:${PERSONAL_INFO.email}`} whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="text-secondary dark:text-secondary-dark hover:text-accent transition-colors duration-200"><EnvelopeIcon className="w-8 h-8"/></motion.a>
            <motion.a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="text-secondary dark:text-secondary-dark hover:text-accent transition-colors duration-200"><LinkedinIcon className="w-8 h-8"/></motion.a>
            <motion.a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="text-secondary dark:text-secondary-dark hover:text-accent transition-colors duration-200"><GithubIcon className="w-8 h-8"/></motion.a>
        </motion.div>
         <motion.footer variants={itemVariants} className="mt-40 text-caption text-secondary dark:text-secondary-dark">
            &copy; {new Date().getFullYear()} Massimo Raso. Built with React, Tailwind CSS, and Framer Motion.
        </motion.footer>
      </motion.div>
    </Section>
  );
});

ContactSection.displayName = 'ContactSection';