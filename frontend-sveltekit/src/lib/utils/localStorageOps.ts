import { browser } from '$app/env';

export function localStorageGet(key: string, isObject = false): any {
	if (browser) {
		const item = localStorage.getItem(key);
		if (item) {
			if (isObject) {
				return JSON.parse(item);
			} else {
				return item;
			}
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
