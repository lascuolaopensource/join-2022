import { browser } from '$app/env';

function browserGet(key: string): any {
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

function browserSet(key: string, value: string): void {
	if (browser) {
		localStorage.setItem(key, value);
	}
}

// Add body type
export async function post(
	fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
	url: string,
	body
) {
	let customError = false;
	try {
		let headers: Record<string, string> = {};

		if (!(body instanceof FormData)) {
			headers['Content-Type'] = 'application/json';
			body = JSON.stringify(body);
		}

		const token: string = browserGet('token');
		if (token) {
			headers['Authorization'] = 'Bearer ' + token;
		}

		const res = await fetch(url, {
			method: 'POST',
			body,
			headers
		});

		if (!res.ok) {
			try {
				const data = await res.json();
				const error = data.message[0].messages[0];
				customError = true;
				throw { id: error.id, message: error.message };
			} catch (err) {
				//
				console.log(err);
				throw err;
			}
		}
		//
		else {
			try {
				const data = await res.json();
				return data;
			} catch (err) {
				//
				throw { id: '', message: 'An unknown error has occurred' };
			}
		}
	} catch (err) {
		//
		console.log(err);
		throw customError
			? err
			: { id: '', message: 'An unknown error has occurred' };
	}
}
