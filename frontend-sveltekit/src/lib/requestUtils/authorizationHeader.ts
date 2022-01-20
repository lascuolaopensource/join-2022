import { lsGetToken } from '../localStorageUtils';

/**
 * Generic functions
 */

export function createAuthValue(token: string) {
	return 'Bearer ' + token;
}

export function createAuthHeader(token: string) {
	return { Authorization: createAuthValue(token) };
}

/**
 * Specific - utility - functions
 */

export function headersAuth() {
	return createAuthHeader(lsGetToken());
}
