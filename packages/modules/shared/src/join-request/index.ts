import { request as req, Request as Req } from "../request";

export const backendURL = "http://localhost:1337/api";

export const errorHandler: Req.ErrorHandler = async (res) => {
    const data = await res.json();
    const message =
        data?.error?.message ||
        data?.message?.[0]?.messages?.[0]?.message ||
        data?.message ||
        res.statusText ||
        `Unknown error: ${res.status}`;

    return new Error(message);
};

export async function send<Res>(args: Req.Args) {
    const argsCopy = { ...args };
    argsCopy.errorHandler = errorHandler;
    argsCopy.path = `${backendURL}/${args.path}`;
    if (args.auth) argsCopy.auth = `Bearer ${args.auth}`;

    return req.send<Res>({ ...argsCopy });
}
