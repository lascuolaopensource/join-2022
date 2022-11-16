import { HTTPMethod, ErrorHandler, Data, Options, Args } from "./types";

// Error handler

export const defaultErrorHandler: ErrorHandler = async (res) => {
    return new Error(res.statusText);
};

// Send function

export async function send<Res = Data>({
    method,
    path,
    data,
    auth,
    fetchImpl = fetch,
    errorHandler = defaultErrorHandler,
}: Args): Promise<Res> {
    const opts: Options = { method, headers: {} };

    if (data && method != HTTPMethod.GET) {
        opts.headers["Content-Type"] = "application/json";
        opts.body = JSON.stringify(data);
    }

    if (auth) {
        opts.headers["Authorization"] = auth;
    }

    const res = await fetchImpl(path, opts);

    if (res.ok || res.status === 422) {
        const text = await res.text();
        return text ? JSON.parse(text) : {}; // TODO: Fix – Fails in case response is not JSON.
    }

    throw await errorHandler(res);
}
