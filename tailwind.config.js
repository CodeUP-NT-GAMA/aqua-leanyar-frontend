/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary1: "#80CBC4",
                primary2: "#B4EBE6",
                primary3: "#FBF8EF",
                primary4: "#FFB433",
            },
        },
        plugins: [],
    }
}