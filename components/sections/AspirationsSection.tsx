
import React, { forwardRef } from 'react';
import { m } from 'framer-motion';
import { Section } from '../ui/Section';
import { BrainIcon, SpaceshipIcon } from '../ui/Icons';

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' }
    }
}

export const AspirationsSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section id="aspirations" ref={ref}>
      <div className="relative w-full max-w-3xl text-center">
         <m.div
             className="absolute -top-12 -left-12 text-accent/30 opacity-50"
             animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
             }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
         >
            <BrainIcon className="w-24 h-24"/>
         </m.div>
         <m.div
             className="absolute -bottom-12 -right-12 text-accent/30 opacity-50"
             animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 0]
             }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
         >
            <SpaceshipIcon className="w-24 h-24"/>
         </m.div>

        <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={textVariants}
        >
            <h2 className="text-h2 text-primary mb-8">My Next Mission</h2>
            <div className="h-1 w-24 bg-accent mx-auto mb-40"></div>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-secondary">
                "My goal is to architect the next generation of data infrastructure—<span className="text-accent font-semibold">intelligent, AI-native pipelines</span> that bridge the gap between raw data and actionable insights. I am passionate about integrating advanced AI and LLM capabilities directly into the data engineering lifecycle, creating systems that are not just automated, but <span className="text-accent font-semibold">truly autonomous and insightful</span>."
            </p>
        </m.div>
      </div>
    </Section>
  );
});

AspirationsSection.displayName = 'AspirationsSection';