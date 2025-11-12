import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';

const TerminalText: React.FC<{ textLines: string[] }> = ({ textLines }) => {
    const [displayedText, setDisplayedText] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutId = useRef<number | null>(null);

    useEffect(() => {
        const type = (lineIdx: number, charIdx: number) => {
            if (lineIdx >= textLines.length) return;

            const currentLine = textLines[lineIdx];
            if (charIdx < currentLine.length) {
                setDisplayedText(prev => prev + currentLine[charIdx]);
                timeoutId.current = window.setTimeout(() => type(lineIdx, charIdx + 1), 20);
            } else {
                setDisplayedText(prev => prev + '\n');
                timeoutId.current = window.setTimeout(() => type(lineIdx + 1, 0), 20);
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setDisplayedText('');
                    if (timeoutId.current) clearTimeout(timeoutId.current);
                    type(0, 0);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.8 }
        );

        const currentRef = containerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, [textLines]);

    return (
      <div ref={containerRef} className="bg-[#0A192F] text-green-300 font-mono p-4 rounded-lg h-64 w-full overflow-y-auto text-sm shadow-inner">
        <pre><code className="whitespace-pre-wrap">
          <span className="text-cyan-300">massimo@portfolio</span>:<span className="text-purple-400">~</span>$ ./run-projects.sh<br/>
          {displayedText}<span className="bg-green-300 w-2 h-4 inline-block animate-pulse"></span>
        </code></pre>
      </div>
    );
};


export const PersonalSection = forwardRef<HTMLElement>((_, ref) => {
  const projectText = [
    'Analyzing personal projects...',
    '===============================',
    'PROJECT: Datapilot CLI',
    '  TYPE: TypeScript, Auto-Insights',
    '  DESC: EDA reports, baseline models.',
    '  STATUS: [ACTIVE]',
    '-------------------------------',
    'PROJECT: Edge AI Exploration',
    '  TYPE: IoT, Microcontrollers',
    '  DESC: Raspberry Pi, ESP32 experiments.',
    '  STATUS: [ACTIVE]',
    '-------------------------------',
    'INTEREST: AI Integration',
    '  DESC: RAG systems, MCP servers.',
    '  STATUS: [ONGOING]',
    '===============================',
    'Script finished successfully.',
  ];
  return (
    <Section id="personal" ref={ref}>
      <div className="w-full max-w-5xl">
        <h2 className="text-h2 text-primary dark:text-primary-dark text-center mb-8">Personal & Education</h2>
        <div className="h-1 w-24 bg-accent mx-auto mb-40"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-h3 text-accent mb-16">Personal Projects & Interests</h3>
            <TerminalText textLines={projectText} />
          </motion.div>
          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, amount: 0.5 }}
             transition={{ duration: 0.2 }}
          >
            <h3 className="text-h3 text-accent mb-16">Education</h3>
            <div className="bg-white dark:bg-warm-cards p-24 rounded-card shadow-card backdrop-blur-sm border border-overlay transition-all duration-200 hover:shadow-card-hover">
              <h4 className="text-xl font-bold text-primary dark:text-primary-dark">Bachelor of Science</h4>
              <p className="font-semibold text-body text-secondary dark:text-secondary-dark mt-8">University of Sydney</p>
              <p className="mt-8 text-body text-secondary dark:text-secondary-dark">Focus: Statistics, Data Analysis, Psychology & Philosophy.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
});

PersonalSection.displayName = 'PersonalSection';