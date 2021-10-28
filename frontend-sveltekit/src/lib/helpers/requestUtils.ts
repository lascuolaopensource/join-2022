import { browser } from '$app/env';

export function browserGet(key: string): any {
	if (browser) {
		const item = localStorage.getItem(key);
		if (item) {
			return JSON.parse(item);
		}
	}
	//
	else {
		return null;
	}
}

export function browserSet(key: string, value: string): void {
	if (browser) {
		localStorage.setItem(key, value);
	}
}

export function authorizationHeader(token: string): string {
	return 'Bearer ' + token;
}

// Add body type
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

		// If the response is not okay
		if (!res.ok) {
			try {
				// We try to get the error message from strapi
				// This is the custom error
				const data = await res.json();
				const error: Error = data.message[0].messages[0];
				customError = true;
				errorMessage = error.message;
			} catch (err) {
				// Otherwise, we'll send the error we get
				throw err;
			}
		}
		// If the respose is okay
		else {
			try {
				// We try to get the data and return it
				const data = await res.json();
				return data;
			} catch (err) {
				throw err;
			}
		}
	} catch (err) {
		throw err;
	}

	// Finally, we throw the customError (if nothing has been returned or thrown)
	if (customError) {
		throw new Error(errorMessage);
	}
}