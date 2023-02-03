const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		darkMode: 'class',
		extend: {
			colors: {
				primary: '#B31F24',
				primaryDarker: '#660c0f'
			},
			maxHeight: {
				0: '0',
				xl: '36rem'
			},
			fontFamily: {
				sans: ['Inter', 'sans']
			}
		}
	},

	plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')]
};

module.exports = config;
