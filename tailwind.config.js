/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    safelist: [
        'bg-blue-500',
        'bg-red-500',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};