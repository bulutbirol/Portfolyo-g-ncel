export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
extend: {
  keyframes: {
    aurora: {
      from: { backgroundPosition: "50% 50%, 50% 50%" },
      to: { backgroundPosition: "350% 50%, 350% 50%" },
    },
  },
  animation: {
    aurora: "aurora 12s linear infinite",
    spin: "spin 4s linear infinite",
  },
},

    },
    plugins: [],
};
