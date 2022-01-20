export function createAuthorizationHeader(token: string): string {
	return 'Bearer ' + token;
}

export function createAuthValue(token: string): string {
	return 'Bearer ' + token;
}

export function createAuthHeader(token: string) {
	return { Authorization: createAuthValue(token) };
}
