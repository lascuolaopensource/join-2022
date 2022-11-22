import { request as req, Request as Req } from "../request";

export const backendURL = "http://localhost:1337/api";

export async function send<T>(args: Req.Args) {
    const argsCopy = { ...args };
    argsCopy.path = `${backendURL}${args.path}`;
    if (args.auth) argsCopy.auth = `Bearer ${args.auth}`;

    const res = await req.send({ ...argsCopy });

    if (!res.ok) throw res;
    else return res.data as T;
}
