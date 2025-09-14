import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        ticker: 'ticker 20s linear infinite',
      },
      colors: {
        brand: {
          50: '#f5f7ff',
          500: '#ffffff',
        },
      },
      backgroundImage: {
        'grid-dots':
          'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}

export default config
