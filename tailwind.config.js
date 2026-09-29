/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Graphite desk, cold-white tape paper, two ribbon inks (black + vermilion).
        desk: { DEFAULT: '#131518', raised: '#1c1f23', line: '#2c3035' },
        paper: { DEFAULT: '#f3f5f4', shade: '#e3e7e5', line: '#c9cfcc' },
        ink: { DEFAULT: '#15171a', mute: '#525960' },
        dim: '#a4abb2',
        vermilion: { DEFAULT: '#c22d14', light: '#ff6b4e' },
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', '"Arial Narrow"', 'sans-serif'],
        text: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"Martian Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        none: '0',
        DEFAULT: '2px',
      },
    },
  },
  plugins: [],
}
