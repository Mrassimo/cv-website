/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        // Premium minimalist palette - Swiss spa aesthetics (WCAG AA compliant)
        primary: '#1A1A1A',
        secondary: '#4B5563', // Darkened from #6B7280 for better contrast (4.5:1+)
        accent: '#4A90E2',
        'accent-hover': '#357ABD',
        background: '#FFFFFF',
        surface: '#FAFAFA',
        'surface-hover': '#F5F5F5',
        border: '#E5E7EB',
        'border-light': '#F3F4F6',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      fontSize: {
        'display': ['56px', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h1': ['48px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h2': ['36px', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.01em' }],
        'h3': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'large': ['20px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      },
      maxWidth: {
        'content': '1080px',
        'narrow': '640px',
      },
    },
  },
  plugins: [],
}
