import React, { useState, useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, m, useScroll, useSpring } from 'framer-motion';
import useLenis from './hooks/useLenis';

import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { AspirationsSection } from './components/sections/AspirationsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ExpertiseSection } from './components/sections/ExpertiseSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { PersonalSection } from './components/sections/PersonalSection';
import { ContactSection } from './components/sections/ContactSection';
import { NavDots } from './components/ui/NavDots';
import { SECTIONS } from './constants';
import { AiAssistant } from './components/ui/AiAssistant';

const App: React.FC = () => {
  const mainRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  useLenis(mainRef);

  const { scrollYProgress } = useScroll({ container: mainRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const scrollContainer = mainRef.current;
    if (!scrollContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: scrollContainer, rootMargin: '-50% 0px -50% 0px' }
    );

    const currentSectionRefs = sectionRefs.current;
    currentSectionRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentSectionRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="font-sans bg-background">
        <main
          ref={mainRef}
          className="bg-background text-primary"
          style={{
              height: '100vh',
              overflowY: 'auto',
              scrollSnapType: 'y mandatory',
          }}
        >
          <m.div className="fixed top-0 left-0 right-0 h-0.5 bg-accent z-50" style={{ scaleX, transformOrigin: "0%" }} />
          <NavDots activeSection={activeSection} />

        <HeroSection ref={(el) => { sectionRefs.current[0] = el; }} />
        <AboutSection ref={(el) => { sectionRefs.current[1] = el; }} />
        <AspirationsSection ref={(el) => { sectionRefs.current[2] = el; }} />
        <ProjectsSection ref={(el) => { sectionRefs.current[3] = el; }} />
        <SkillsSection ref={(el) => { sectionRefs.current[4] = el; }} />
        <ExpertiseSection ref={(el) => { sectionRefs.current[5] = el; }} />
        <ExperienceSection ref={(el) => { sectionRefs.current[6] = el; }} />
        <PersonalSection ref={(el) => { sectionRefs.current[7] = el; }} />
        <ContactSection ref={(el) => { sectionRefs.current[8] = el; }} />
        </main>
        <AiAssistant />
      </div>
    </LazyMotion>
  );
};

export default App;