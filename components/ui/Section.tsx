
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
        className={`min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 py-20 md:py-24 relative ${className}`}
        style={{ scrollSnapAlign: 'center' }}
      >
        <div className="w-full max-w-content mx-auto">
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';
