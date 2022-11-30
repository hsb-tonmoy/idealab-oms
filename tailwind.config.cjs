const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		darkMode: 'class',
		extend: {
			maxHeight: {
				0: '0',
				xl: '36rem'
			},
			fontFamily: {
				sans: ['Inter', 'sans']
			}
		}
	},

	plugins: [require('@tailwindcss/forms')]
};

module.exports = config;
