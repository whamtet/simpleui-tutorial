const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./frontend/*.html"],
	theme: {
		extend: {},
		colors: {
			...colors,
			'clj-green': '#A2DA5F',
			'clj-blue': '#97B3F8'
		}
	},
	plugins: [],
}
