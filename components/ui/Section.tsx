
import React, { forwardRef } from 'react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className = '' }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={`min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 py-16 relative overflow-hidden ${className}`}
        style={{ scrollSnapAlign: 'center' }}
      >
        <div className="w-full max-w-container mx-auto">
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';
