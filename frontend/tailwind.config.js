/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
    theme: {
        extend: {
            keyframes: {
                'fade-in-down': {
                    'from': {
                        transform: 'translateY(-0.75rem)',
                        opacity: '0'
                    },
                    'to': {
                        transform: 'translateY(0)',
                        opacity: '1'
                    }
                }
            },
            animation: {
                'fade-in-down': "fade-in-down 0.2s ease-in-out both",
            },
        },
        fontFamily: {
            Poppins: ['Poppins', 'sans-serif']
        }
    },
    plugins: [require("@tailwindcss/forms")],
};
