
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { BlueprintIcon, LightbulbIcon, ShareIcon } from '../ui/Icons';

const cardData = [
  {
    icon: BlueprintIcon,
    title: "Senior Analytics Engineer",
    text: "8+ years of experience building scalable data platforms that deliver product insights and empower teams to ship with confidence."
  },
  {
    icon: LightbulbIcon,
    title: "Insights Analyst",
    text: "Passionate about AI, translating ambiguous business problems into elegant, high-impact data products using cutting-edge technologies."
  },
  {
    icon: ShareIcon,
    title: "Enthusiastic Ever-Learner",
    text: "Dedicated to sharing and mentoring in analytics engineering, while fostering a culture of data-informed decision making."
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
    hidden: (i: number) => ({
        opacity: 0,
        x: i % 2 === 0 ? -100 : 100
    }),
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 50
        }
    }
}

export const AboutSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section id="about" ref={ref}>
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-2">Who I Am</h2>
        <div className="h-1 w-24 bg-highlight mx-auto mb-12"></div>
      </div>
      <motion.div 
        className="w-full max-w-4xl space-y-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {cardData.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            variants={cardVariants}
            className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white/5 dark:bg-black/10 rounded-lg shadow-lg backdrop-blur-sm border border-white/10 dark:border-black/20"
          >
            <div className="flex-shrink-0 w-16 h-16 bg-highlight/10 text-highlight rounded-full flex items-center justify-center">
              <card.icon className="w-8 h-8"/>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p className="text-primary/70 dark:text-accent/70 mt-2">{card.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
});

AboutSection.displayName = 'AboutSection';
