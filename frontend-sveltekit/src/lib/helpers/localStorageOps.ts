import { browser } from '$app/env';

export function localStorageGet(key: string): any {
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

export function localStorageSet(key: string, value: string): void {
	if (browser) {
		localStorage.setItem(key, value);
	}
}

export function localStorageRemove(key: string) {
	if (browser) {
		localStorage.removeItem(key);
	}
}
