import { browser } from '$app/env';
import { lsKeys } from './keys';

/**
 * Generic functions
 */

export function lsGet(key: string): string {
	if (browser) {
		return localStorage.getItem(key);
	}
}

export function lsSet(key: string, value: string): void {
	if (browser) {
		localStorage.setItem(key, value);
	}
}

export function lsRemove(key: string) {
	if (browser) {
		localStorage.removeItem(key);
	}
}

/**
 * Specific functions
 */

export function lsGetToken(): string {
	return lsGet(lsKeys.token);
}
