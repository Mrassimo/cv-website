
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
        <h2 className="text-h2 text-primary dark:text-primary-dark mb-8">Who I Am</h2>
        <div className="h-1 w-24 bg-accent mx-auto mb-40"></div>
      </div>
      <motion.div
        className="w-full max-w-4xl space-y-32"
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
            className="flex flex-col sm:flex-row items-center gap-16 p-24 bg-white dark:bg-warm-cards rounded-card shadow-card backdrop-blur-sm border border-overlay transition-all duration-200"
            whileHover={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="flex-shrink-0 w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center">
              <card.icon className="w-8 h-8"/>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-h3 text-primary dark:text-primary-dark">{card.title}</h3>
              <p className="text-body text-secondary dark:text-secondary-dark mt-8">{card.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
});

AboutSection.displayName = 'AboutSection';
