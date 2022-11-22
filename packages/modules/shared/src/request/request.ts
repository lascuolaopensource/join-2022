import { HTTPMethod, Options, Args } from "./types";

// Send function

export async function send({
    method,
    path,
    data,
    auth,
    fetchImpl = fetch,
}: Args): Promise<any> {
    const opts: Options = { method, headers: {} };

    if (data && method != HTTPMethod.GET) {
        opts.headers["Content-Type"] = "application/json";
        opts.body = JSON.stringify(data);
    }

    if (auth) {
        opts.headers["Authorization"] = auth;
    }

    const res = await fetchImpl(path, opts);

    if (!res.ok) throw new Error(res.statusText);

    try {
        return await res.json();
    } catch (e) {
        return await res.text();
    }
}
