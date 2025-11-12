import React, { forwardRef } from 'react';
import { m } from 'framer-motion';
import { PERSONAL_INFO } from '../../constants';
import { Section } from '../ui/Section';
import { Button } from '../ui/button';
import { GithubIcon, EnvelopeIcon, LinkedinIcon } from '../ui/Icons';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

export const HeroSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section id="home" ref={ref} className="text-center bg-background">
      <m.div
        className="flex flex-col items-center max-w-narrow mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <m.h1
          className="text-display font-bold tracking-tight text-primary mb-6"
          variants={itemVariants}
        >
          {PERSONAL_INFO.name}
        </m.h1>
        <m.h2
          className="text-h2 font-semibold text-secondary mb-3"
          variants={itemVariants}
        >
          {PERSONAL_INFO.title}
        </m.h2>
        <m.p className="text-large text-secondary mb-12" variants={itemVariants}>
          {PERSONAL_INFO.location} · {PERSONAL_INFO.citizen}
        </m.p>
        <m.div className="flex flex-wrap justify-center items-center gap-4" variants={itemVariants}>
           <Button variant="default" size="lg" asChild>
             <a
               href={PERSONAL_INFO.linkedin}
               target="_blank"
               rel="noopener noreferrer"
             >
               <LinkedinIcon className="w-5 h-5" />
               <span>LinkedIn</span>
             </a>
           </Button>
           <Button variant="secondary" size="lg" asChild>
             <a href={`mailto:${PERSONAL_INFO.email}`}>
               <EnvelopeIcon className="w-5 h-5" />
               <span>Email</span>
             </a>
           </Button>
           <Button variant="secondary" size="lg" asChild>
             <a
               href={PERSONAL_INFO.github}
               target="_blank"
               rel="noopener noreferrer"
             >
               <GithubIcon className="w-5 h-5" />
               <span>GitHub</span>
             </a>
           </Button>
        </m.div>
      </m.div>
    </Section>
  );
});

HeroSection.displayName = 'HeroSection';
