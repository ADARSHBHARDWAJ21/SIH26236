/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zen: {
          950: '#F8FAFC', // Main page background: light crisp slate-50
          900: '#FFFFFF', // Clean white cards / panels
          850: '#F1F5F9', // Elevated light containers (slate-100)
          800: '#E2E8F0', // Hover states / inputs / borders (slate-200)
          750: '#CBD5E1', // Hover states (slate-300)
          700: '#94A3B8', // Slate-400
          600: '#64748B', // Slate-500
          500: '#475569', // Slate-600
        },
        brand: {
          emerald: '#2563EB', // Vibrant Royal Blue
          teal: '#3B82F6',    // Electric Blue
          cyan: '#0EA5E9',    // Sky Blue
          mint: '#1D4ED8',    // Deep Blue
          blue: '#2563EB',    // Royal Blue
          sky: '#0EA5E9',     // Sky Blue
          indigo: '#4F46E5',  // Indigo Accent
          navy: '#1E3A8A',    // Dark Navy
          lime: '#60A5FA',    // Light Blue
          amber: '#F59E0B',
          gold: '#EAB308',
          rose: '#EF4444',
          violet: '#8B5CF6',
          glow: '#2563EB',
        },
        charcoal: {
          950: '#F8FAFC',
          900: '#FFFFFF',
          850: '#F1F5F9',
          800: '#E2E8F0',
          700: '#94A3B8',
          600: '#64748B',
          500: '#475569',
        },
        warm: {
          50: '#020617',
          100: '#0F172A', // Main dark text (slate-900)
          200: '#1E293B', // Secondary text (slate-800)
          300: '#334155', // Body text (slate-700)
          400: '#64748B', // Muted text (slate-500)
          500: '#94A3B8', // Subdued text (slate-400)
          card: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '18px',
        '3xl': '26px',
        '4xl': '32px',
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
        'zen': '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'zen-glow': '0 0 35px -5px rgba(37, 99, 235, 0.3)',
        'glow-blue': '0 0 30px -4px rgba(37, 99, 235, 0.35)',
        'glow-teal': '0 0 25px -3px rgba(59, 130, 246, 0.3)',
        'glow-amber': '0 0 25px -3px rgba(245, 158, 11, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'zen-mesh': 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.12) 0%, transparent 60%), radial-gradient(circle at 100% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 50%)',
      }
    },
  },
  plugins: [],
}
