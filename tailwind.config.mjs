/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsl(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
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
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: '#000000',
            h1: {
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '0.25em',
            },
            h2: {
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: 0,
            },
            h3: {
              fontSize: '1.25rem',
              lineHeight: '1.75rem',
              fontWeight: '600',
              color: 'black',
              marginBottom: '0',
              '@media (max-width: 639px)': {
                fontSize: '1rem',
                lineHeight: '1.75rem',
              },
            },

            p: {
              fontSize: '1.1rem',
              marginBottom: 0,
              lineHeight: '1.5',
              color: 'oklch(44.6% 0.03 256.802)',
              '@media (max-width: 639px)': {
                fontSize: '1rem', // smaller on sm and below
              },
            },
          },
        },

        hero: {
          css: {
            h1: {
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '',
              fontSize: '1.25rem',
              '@media (max-width: 639px)': {
                fontSize: '1.1rem', // smaller on sm and below
              },
            },
            h2: {
              fontSize: '1.5rem',
              fontWeight: '600',
              fontSize: '1.25rem',
              marginBottom: '.25em',
              marginTop: '0rem',
              '@media (max-width: 639px)': {
                fontSize: '1rem', // smaller on sm and below
              },
            },
            h3: {
              fontSize: '1.3rem',
              fontWeight: '600',
              marginBottom: '0',
              marginTop: '0rem',
              fontSize: '1.25rem',
              color: 'white',
              '@media (max-width: 639px)': {
                fontSize: '1rem', // smaller on sm and below
              },
            },
            p: {
              fontSize: '1.3rem',
              fontWeight: '600',
              marginBottom: '0',
              marginTop: '0rem',
              color: 'white',
              '@media (max-width: 639px)': {
                fontSize: '1rem', // smaller on sm and below
              },
            },
          },
        },
      }),
    },
  },
}
