/** @type {import('postcss-load-config').Config} */
// Loads Tailwind CSS through PostCSS during Next.js builds.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
