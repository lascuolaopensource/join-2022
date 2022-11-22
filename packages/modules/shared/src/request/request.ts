import { HTTPMethod, Options, Args, Res } from "./types";

// Send function

export async function send({
    method,
    path,
    data,
    auth,
    fetchImpl = fetch,
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

    let resData: Res = {
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
        data: null,
    };

    try {
        resData.data = await res.json();
    } catch (e) {
        resData.data = await res.text();
    }

    return resData;
}
