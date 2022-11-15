module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			borderWidth: {
				1: '1px'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
