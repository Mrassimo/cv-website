import React, { forwardRef } from 'react';
import { Section } from '../ui/Section';
import { SkillsCatalog } from '../skills/SkillsCatalog';

export const ExpertiseSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section id="expertise" ref={ref}>
      <div className="w-full">
        <SkillsCatalog />
      </div>
    </Section>
  );
});

ExpertiseSection.displayName = 'ExpertiseSection';
