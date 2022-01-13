export default async function post(
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
			// We have to collect the error message
			let errorMessage;

			// It can be a generic 404 not found
			if (res.status == 404) {
				errorMessage = res.status;
			}
			// Otherwise we have to extract the message from the object:
			// - The first way is strapi specific:
			//   https://strapi.io/blog/how-to-create-a-blog-with-svelte-kit-strapi
			// - The second and third ones are more generic
			else {
				const data = await res.json();
				errorMessage =
					data?.message?.[0]?.messages?.[0]?.message ||
					data?.error?.message ||
					data?.message ||
					'Unknown error';
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
