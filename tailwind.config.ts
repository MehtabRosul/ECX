
import type {Config} from 'tailwindcss';

const plugin = require('tailwindcss/plugin')

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'marquee': {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(calc(-100% - var(--gap)), 0, 0)' },
        },
        'marquee-vertical': {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(0, calc(-100% - var(--gap)), 0)' },
        },
        'shine': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'shimmer-slide': {
          to: {
            transform: 'translate(calc(100cqw - 100%), 0)',
          },
        },
        'spin-around': {
          '0%': {
            transform: 'translateZ(0) rotate(0)',
          },
          '15%, 35%': {
            transform: 'translateZ(0) rotate(90deg)',
          },
          '65%, 85%': {
            transform: 'translateZ(0) rotate(270deg)',
          },
          '100%': {
            transform: 'translateZ(0) rotate(360deg)',
          },
        },
        'gradient': {
          '0%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
          },
        },
        'neon-rotate': {
          '0%': {
            transform: 'rotate(0deg)',
            filter: 'hue-rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(90deg)',
            filter: 'hue-rotate(90deg)',
          },
          '50%': {
            transform: 'rotate(180deg)',
            filter: 'hue-rotate(180deg)',
          },
          '75%': {
            transform: 'rotate(270deg)',
            filter: 'hue-rotate(270deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
            filter: 'hue-rotate(360deg)',
          },
        },
        'neon-pulse': {
          '0%, 100%': {
            opacity: '0.8',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'marquee': 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        'shine': 'shine var(--shine-duration, 5s) linear infinite',
        'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
        'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
        'gradient': 'gradient 8s linear infinite',
        'neon-rotate': 'neon-rotate 4s linear infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(hsl(var(--muted)) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-pattern': '1.5rem 1.5rem',
      },
    },
  },
  plugins: [
      require('tailwindcss-animate'),
      plugin(function({ addUtilities, theme }: { addUtilities: any, theme: any }) {
        addUtilities({
          '.perspective-1000': {
            perspective: '1000px',
          },
          '.backface-hidden': {
            'backface-visibility': 'hidden',
          },
          '.transform-style-3d': {
            'transform-style': 'preserve-3d',
          },
        })
      })
    ],
} satisfies Config;
