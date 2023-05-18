/**
 * Type utilities
 */

export type Fetch = (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
) => Promise<Response>;

export enum HTTPMethod {
    CONNECT = "CONNECT",
    DELETE = "DELETE",
    GET = "GET",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    PATCH = "PATCH",
    POST = "POST",
    PUT = "PUT",
    TRACE = "TRACE",
}

/**
 * "Send" function definitions
 */

export interface Args {
    method: HTTPMethod;
    path: string;
    data?: Record<string, unknown>;
    auth?: string;
    fetchImpl?: Fetch;
}

export interface Options {
    method: HTTPMethod;
    headers: {
        "Content-Type"?: string;
        Authorization?: string;
    };
    body?: string;
}

export interface Res<T, E> {
    ok: boolean;
    status: number;
    statusText: string;
    data: T | null;
    error: E | null;
}
