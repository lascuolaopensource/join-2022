/**
 * Questa funzione:
 * – accetta fetch come argomento perchè in sveltekit esistono due tipi di fetch
 *   • quello base che si usa sul client
 *   • una versione speciale che si usa sul server (dentro load)
 * - accetta come body direttamente un oggetto, niente FormData
 */

export async function request(
	fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
	url: RequestInfo,
	method: 'GET' | 'POST' | 'PUT' = 'GET',
	body: Record<string, any> = null,
	headers: HeadersInit = {}
) {
	try {
		/**
		 * Building RequestInit
		 */
		const init: RequestInit = {};

		// Adding method
		init.method = method;

		// Adding body
		if (body && method != 'GET') {
			init.body = JSON.stringify(body);
			headers['Content-Type'] = 'application/json';
		}

		// Adding headers
		init.headers = headers;

		/**
		 * Sending request
		 */

		const res = await fetch(url, init);

		/**
		 * Response handling
		 */

		// ERROR
		if (!res.ok) {
			// We have to collect the error message
			// - The first way is strapi specific:
			//   https://strapi.io/blog/how-to-create-a-blog-with-svelte-kit-strapi
			// - The second and third ones are more generic
			const data = await res.json();
			const errorMessage =
				data?.message?.[0]?.messages?.[0]?.message ||
				data?.error?.message ||
				data?.message ||
				'Unknown error';

			// Then we throw the error
			throw new Error(errorMessage);
		}
		// OK
		else {
			const data = await res.json();
			return data;
		}
	} catch (err) {
		throw err;
	}
}
