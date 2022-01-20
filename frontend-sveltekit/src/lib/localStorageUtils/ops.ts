import { browser } from '$app/env';

export function lsGet(key: string, isObject = false): any {
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
