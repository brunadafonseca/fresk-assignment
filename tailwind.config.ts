import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'primary': {
        100: '#FFFCF9',
        200: '#FBF4ED',
        300: '#F0DDC9',
        400: '#BDA89E',
        DEFAULT: '#BDA89E',
      },
      'secondary': {
        100: '#715F5F',
        DEFAULT: '#3D282F',
      },
    },
    fontFamily: {
      sans: ['Urbanist', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        'xs': '0.25rem',
        'sm': '0.375rem',
        'md': '0.5rem',
      }
    }
  },
  plugins: [],
}
export default config
