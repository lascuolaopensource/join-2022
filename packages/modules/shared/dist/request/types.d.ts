/**
 * Type utilities
 */
export declare type Fetch = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
export declare enum HTTPMethod {
    CONNECT = "CONNECT",
    DELETE = "DELETE",
    GET = "GET",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    PATCH = "PATCH",
    POST = "POST",
    PUT = "PUT",
    TRACE = "TRACE"
}
/**
 * "Send" function definitions
 */
export declare type Data = Record<string, unknown>;
export declare type ErrorHandler = (res: Response) => Promise<Error>;
export interface Args {
    method: HTTPMethod;
    path: string;
    data?: Data;
    auth?: string;
    fetchImpl?: Fetch;
    errorHandler?: ErrorHandler;
}
export interface Options {
    method: HTTPMethod;
    headers: {
        "Content-Type"?: string;
        Authorization?: string;
    };
    body?: string;
}
