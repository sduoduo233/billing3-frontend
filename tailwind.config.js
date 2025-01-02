/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "black": "#000000",
                "white": "#ffffff",
                "surface": "#111318",
                "container": "#1d2024",
                "primary0": "#ccddff",
                "primary": "#aac7ff",
                "primary2": "#8eace3",
                "primary3": "#7491c7",
                "on-primary": "#0a305f",
                "secondary": "#bec6dc",
                "on-secondary": "#283141",
                "on-surface": "#e2e2e9",
                "on-surface2": "#c4c6d0",
                "outline": "#44474e"
            }, saturate: {
                25: '.25',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
    darkMode: "selector"
}

