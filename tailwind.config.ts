import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        clinic: {
          50: '#eef6f6',
          100: '#d7e9e9',
          200: '#b0d3d3',
          300: '#83b8b8',
          400: '#5a9d9d',
          500: '#3c8080',
          600: '#2e6666',
          700: '#265252',
          800: '#1f4242',
          900: '#123030',
          950: '#0a1c1c',
        },
        accent: {
          50: '#fbf6ee',
          100: '#f3e5cb',
          200: '#e7c894',
          300: '#dba75d',
          400: '#cf8b36',
          500: '#b06f26',
          600: '#8d571e',
          700: '#6b421a',
          800: '#4c2f16',
          900: '#301d0e',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 2px 12px -2px rgba(18, 48, 48, 0.08), 0 1px 2px rgba(18,48,48,0.04)',
        elevated: '0 12px 32px -8px rgba(18, 48, 48, 0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};

export default config;
