import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FDFCF8',
          100: '#FAF7F0',
          200: '#F3EDD9',
          300: '#E8DFC0',
          DEFAULT: '#FAF7F0',
        },
        forest: {
          50:  '#EEF4EE',
          100: '#D0E4D0',
          200: '#93BC93',
          300: '#5C9B5C',
          400: '#3A7D3A',
          500: '#2D6A2D',
          600: '#1F521F',
          DEFAULT: '#2D6A2D',
        },
        ink: '#1A1A1A',
        muted: '#6B6B6B',
        border: '#E2DDD0',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans:  ['system-ui', '-apple-system', 'sans-serif'],
        mono:  ['"Courier New"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '4px',
        lg: '6px',
        xl: '8px',
        full: '9999px',
        none: '0',
      },
    },
  },
  plugins: [],
}
export default config
