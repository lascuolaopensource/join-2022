export function authorizationHeader(token: string): string {
	return 'Bearer ' + token;
}

// Robbe da sistemare
export async function post(
	fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
	url: RequestInfo,
	body: Record<string, any> | string,
	headers: HeadersInit = {}
) {
	// // This variable is needed to check if there's a custom error from Strapi
	let customError = false;
	let errorMessage = '';

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

		// Then we get the data
		const data = await res.json();

		// If the response is not okay
		// We extract the error message from data
		if (!res.ok) {
			// We set customError to be true
			customError = true;
			// Then we extract the Error message
			// There are actually two ways to extract the message:
			// - The first one is strapi specific:
			//   https://strapi.io/blog/how-to-create-a-blog-with-svelte-kit-strapi
			// - The second one is the generic
			errorMessage =
				data?.message?.[0]?.messages?.[0]?.message ||
				data?.message ||
				'Unknown error. Tell the developers to check the response shape.';
		}
		// If the respose is okay
		// We return the data
		else {
			return data;
		}
	} catch (err) {
		throw err;
	}

	// Finally, we throw the customError (if nothing has been returned or thrown)
	if (customError) {
		throw new Error(errorMessage);
	}
}
