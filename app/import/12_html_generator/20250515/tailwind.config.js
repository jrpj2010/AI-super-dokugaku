/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",     // Jinja2 テンプレート
    "./static/js/**/*.js",       // Alpine / 自作 JS
    "./static/css/**/*.css"      // もし @apply を使うなら
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
