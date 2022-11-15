import { error } from '@sveltejs/kit';

/* Utils */

export enum HTTPMethod {
	CONNECT = 'CONNECT',
	DELETE = 'DELETE',
	GET = 'GET',
	HEAD = 'HEAD',
	OPTIONS = 'OPTIONS',
	PATCH = 'PATCH',
	POST = 'POST',
	PUT = 'PUT',
	TRACE = 'TRACE'
}

/* Strapi utils */

// L'URL base, importato dall'.env
export const baseUrl = <string>import.meta.env.VITE_BACKEND_URL;

// Scorciatoia per url base
export const b = (path: string) => `${baseUrl}/${path}`;
export const p = (path: string, prefix = 'api') => b(`${prefix}/${path}`);

/**
 * Main request function
 */

export type Data = Record<string, unknown>;

export interface Args {
	method: HTTPMethod;
	path: string;
	data?: Data;
	token?: string;
}

export interface Options {
	method: HTTPMethod;
	headers: {
		'Content-Type'?: string;
		Authorization?: string;
	};
	body?: string;
}

export async function send<T = Data>({ method, path, data, token }: Args): Promise<T> {
	const opts: Options = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Token ${token}`;
	}

	const res = await fetch(path, opts);
	if (res.ok || res.status === 422) {
		const text = await res.text();
		return text ? JSON.parse(text) : {};
	}

	throw error(res.status);
}

/**
 * Shorthand functions
 */

export function get<T = Data>(path: string, token?: string) {
	return send<T>({ method: HTTPMethod.GET, path, token });
}

export function del<T = Data>(path: string, token?: string) {
	return send<T>({ method: HTTPMethod.DELETE, path, token });
}

export function post<T = Data>(path: string, data: Data, token?: string) {
	return send<T>({ method: HTTPMethod.POST, path, data, token });
}

export function put<T = Data>(path: string, data: Data, token?: string) {
	return send<T>({ method: HTTPMethod.PUT, path, data, token });
}
