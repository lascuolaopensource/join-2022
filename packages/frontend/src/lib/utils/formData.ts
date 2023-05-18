import { nestifyObject } from 'nestify-anything';

export function extract(data: FormData) {
	const rec: Record<string, unknown> = {};
	for (const [key, value] of data.entries()) {
		rec[key] = value;
	}
	return rec;
}

export function restructure(data: FormData) {
	return nestifyObject(extract(data));
}
