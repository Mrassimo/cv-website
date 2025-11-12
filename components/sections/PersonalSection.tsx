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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-2">Personal & Education</h2>
        <div className="h-1 w-24 bg-highlight mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-highlight">Personal Projects & Interests</h3>
            <TerminalText textLines={projectText} />
          </motion.div>
          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, amount: 0.5 }}
             transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-highlight">Education</h3>
            <div className="bg-white/5 dark:bg-black/10 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-white/10 dark:border-black/20">
              <h4 className="text-xl font-bold">Bachelor of Science</h4>
              <p className="font-semibold text-primary/80 dark:text-accent/80">University of Sydney</p>
              <p className="mt-2 text-primary/70 dark:text-accent/70">Focus: Statistics, Data Analysis, Psychology & Philosophy.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
});

PersonalSection.displayName = 'PersonalSection';