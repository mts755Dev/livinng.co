/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontSize: {
			rem: '10px',
		},

		zIndex: {
			0: '0',
			auto: 'auto',
		},
		extend: {
			fontSize: generateExtentions(10, 32, 'px'),
			colors: {
				transparent: 'transparent',
				black: '#000',
				white: '#fff',
				red: '#ff0000',
				corporate: {
					blue: '#17387e',
					yellow: '#ffde59',
				},
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
			},
			spacing: Object.assign(
				generateExtentions(0, 50, 'px'),
				generateExtentions(0, 10, '%')
			),
			zIndex: generateExtentions(0, 9),
		},
	},
	plugins: [],
}

function generateExtentions(min, max, suf = '') {
	const extend = {}

	for (let i = min; i <= max; i++) {
		extend[`${i}${suf}`] = `${i}${suf}`
	}
	return extend
}
