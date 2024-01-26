const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        text: 'hsl(var(--text) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        primary: 'hsl(var(--primary) / <alpha-value>)',
        secondary: 'hsl(var(--secondary) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'base-100': 'hsl(var(--base-100) / <alpha-value>)',
        info: 'hsl(var(--info) / <alpha-value>)',
        success: 'hsl(var(--success) / <alpha-value>)',
        warning: 'hsl(var(--warning) / <alpha-value>)',
        error: 'hsl(var(--error) / <alpha-value>)',
        //   neutral: {
        //     '50': '#f6f7f8',
        //     '100': '#e5e7eb',
        //     '200': '#dadde3',
        //     '300': '#c1c7cf',
        //     '400': '#a2aab8',
        //     '500': '#8c93a5',
        //     '600': '#7a8096',
        //     '700': '#6e7287',
        //     '800': '#5d5f70',
        //     '900': '#4d4f5b',
        //     '950': '#31323a',
        // },
        transparent: 'rgb(var(--transparent) / <alpha-value>)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
