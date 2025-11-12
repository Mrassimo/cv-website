
import React from 'react';
import { SECTIONS } from '../../constants';

interface NavDotsProps {
  activeSection: string;
}

export const NavDots: React.FC<NavDotsProps> = ({ activeSection }) => {
  return (
    <nav className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <ul className="flex flex-col gap-4">
        {SECTIONS.map((section) => (
          <li key={section.id} className="group">
            <a
              href={`#${section.id}`}
              className="block w-3 h-3 rounded-full transition-all duration-300 ease-in-out bg-secondary/40 group-hover:bg-accent"
              style={{
                transform: activeSection === section.id ? 'scale(1.5)' : 'scale(1)',
                backgroundColor: activeSection === section.id ? '#4A90E2' : '',
              }}
              aria-label={`Go to ${section.title} section`}
            >
              <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2 py-1 rounded bg-primary text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {section.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
