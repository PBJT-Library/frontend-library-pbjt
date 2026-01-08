/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Enable class-based dark mode
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#EFF6FF',
                    100: '#DBEAFE',
                    200: '#BFDBFE',
                    300: '#93C5FD',
                    400: '#60A5FA',
                    500: '#2563EB',
                    600: '#1D4ED8',
                    700: '#1E40AF',
                    800: '#1E3A8A',
                    900: '#1E3A8A',
                },
                success: {
                    DEFAULT: '#16A34A',
                    light: '#BBF7D0',
                    dark: '#15803D',
                },
                warning: {
                    DEFAULT: '#F59E0B',
                    light: '#FEF3C7',
                    dark: '#D97706',
                },
                error: {
                    DEFAULT: '#DC2626',
                    light: '#FECACA',
                    dark: '#B91C1C',
                },
                info: {
                    DEFAULT: '#0284C7',
                    light: '#BAE6FD',
                    dark: '#0369A1',
                },
            },
            borderRadius: {
                'xl': '0.75rem',
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            boxShadow: {
                'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
                'card': '0 4px 12px rgba(0, 0, 0, 0.1)',
                'elevated': '0 8px 24px rgba(0, 0, 0, 0.12)',
                'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
            },
            animation: {
                'fade-in': 'fadeIn 0.2s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
