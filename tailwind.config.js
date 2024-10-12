/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "rgb(78, 55, 151)", // Purple
        secondary: "rgb(84, 187, 189)", // Blue
        tertiary: "rgb(143 211 147)", // Green
        "secondary-light-color": "rgb(177, 186, 200)",
        "thirdly-light-color": "rgb(242, 244, 247)",
        error: "rgb(239, 68, 68)",
        warning: "rgb(234, 179, 8)",
        success: "rgb(34, 197, 94)",
        edit: "rgb(59, 130, 246)"
      },
      fontFamily: {
        IBM: ["IBM Plex Sans Arabic", "sans-serif"],
      }
    },
  },
  plugins: [],
}

