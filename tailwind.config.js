/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                text: '#0b0911',
                background: '#f6f5fa',
                primary: '#6955b4',
                secondary: '#a295d4',
                accent: '#8572cc'
            }
        }
    },
    plugins: [],
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
};
