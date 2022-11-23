import { HTTPMethod, Options, Args, Res } from "./types";

// Send function

export async function send<T, E = any>({
    method,
    path,
    data,
    auth,
    fetchImpl = fetch,
}: Args): Promise<Res<T, E>> {
    const opts: Options = { method, headers: {} };

    if (data && method != HTTPMethod.GET) {
        opts.headers["Content-Type"] = "application/json";
        opts.body = JSON.stringify(data);
    }

    if (auth) {
        opts.headers["Authorization"] = auth;
    }

    const res = await fetchImpl(path, opts);

    try {
        const data = await res.json();
        return {
            ok: res.ok,
            status: res.status,
            statusText: res.statusText,
            data: res.ok ? data : null,
            error: !res.ok ? data : null,
        };
    } catch (e) {
        throw new Error(`Failed to parse response: ${e}`);
    }
}
