import { writable } from 'svelte/store';

export const formError = writable<string>(null);

export function setFormError(message: string) {
	formError.set(message);
}

export function clearFormError() {
	formError.set(null);
}
