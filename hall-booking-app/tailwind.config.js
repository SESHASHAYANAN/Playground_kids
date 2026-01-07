/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                },
                dark: {
                    100: '#1e1e1e',
                    200: '#2d2d2d',
                    300: '#3a3a3a',
                    400: '#444444',
                    500: '#555555',
                    600: '#666666',
                    700: '#777777',
                    800: '#888888',
                    900: '#999999',
                },
                accent: {
                    teal: '#64ffda',
                    blue: '#3a506b',
                    red: '#ff6b6b',
                    purple: '#4A00E0',
                    green: '#10B981',
                    yellow: '#F59E0B',
                    pink: '#EC4899',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-dark': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                'gradient-card': 'linear-gradient(145deg, #1e1e2f 0%, #252535 100%)',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(100, 255, 218, 0.3)',
                'glow-lg': '0 0 40px rgba(100, 255, 218, 0.4)',
                'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
                'elevated': '0 8px 32px rgba(0, 0, 0, 0.4)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                'fade-in-delay': 'fadeInDelay 1s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'slide-down': 'slideDown 0.3s ease-out forwards',
                'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
                'bounce-dot': 'bounceDot 1.5s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
                'shake': 'shake 0.5s ease-in-out',
                'spin-slow': 'spinSlow 20s linear infinite',
                'gradient-text': 'gradientText 4s ease infinite',
                'gradient-shift': 'gradient-shift 8s ease infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDelay: {
                    '0%, 30%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                bounceSubtle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                bounceDot: {
                    '0%, 100%': { transform: 'translateY(0) scale(1)' },
                    '50%': { transform: 'translateY(-3px) scale(1.1)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(100, 255, 218, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(100, 255, 218, 0.5)' },
                },
                pulseSubtle: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.85' },
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
                    '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
                },
                spinSlow: {
                    'from': { transform: 'rotate(0deg)' },
                    'to': { transform: 'rotate(360deg)' },
                },
                gradientText: {
                    '0%, 100%': { backgroundPosition: '0% 50%', filter: 'hue-rotate(0deg)' },
                    '50%': { backgroundPosition: '100% 50%', filter: 'hue-rotate(15deg)' },
                },
                'gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
            screens: {
                'xs': '475px',
            },
        },
    },
    plugins: [],
}
