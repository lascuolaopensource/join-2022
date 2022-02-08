import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// This fix allows some imports
		vite: {
			optimizeDeps: {
				include: ['graphql-request']
			}
		}
	}
};

export default config;
