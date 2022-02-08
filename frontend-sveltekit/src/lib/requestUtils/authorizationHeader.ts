import { lsGetToken } from '../localStorageUtils';

/**
 * Generic functions
 */

export function createAuthHeader(token: string) {
	return { Authorization: 'Bearer ' + token };
}

/**
 * Specific - utility - functions
 */

export function headersAuth() {
	if (lsGetToken()) {
		return createAuthHeader(lsGetToken());
	} else {
		return {};
	}
}
