export function createAuthorizationHeader(token: string): string {
	return 'Bearer ' + token;
}

// Robbe da sistemare
export async function post(
	fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
	url: RequestInfo,
	body: Record<string, any> | string,
	headers: HeadersInit = {}
) {
	// We try to send the POST request
	try {
		// If body is not form data,
		if (!(body instanceof FormData)) {
			// We convert it to stringified object
			body = JSON.stringify(body);
			// And we add to the headers (aka we tell to the server)
			// that the data we're sending is actually a JSON
			headers['Content-Type'] = 'application/json';
		}

		// We send the request
		const res = await fetch(url, {
			method: 'POST',
			body,
			headers
		});

		// If the response is not okay
		if (!res.ok) {
			// We extract the error message
			let errorMessage;

			// It can be a generic 404 not found
			if (res.status == 404) {
				errorMessage = res.status;
			}

			// Or a Strapi messsage:
			// - The first one is strapi specific:
			//   https://strapi.io/blog/how-to-create-a-blog-with-svelte-kit-strapi
			// - The second one is the generic
			else {
				const data = await res.json();
				errorMessage =
					data?.message?.[0]?.messages?.[0]?.message || data?.message;
			}

			// Then we throw the error
			throw new Error(errorMessage);
		}

		// If the respose is okay
		else {
			// We return the data
			const data = await res.json();
			return data;
		}
	} catch (err) {
		throw err;
	}
}
