import { request as req, Request as Req } from "../request";

export const backendURL = "http://localhost:1337/api";

export type StrapiError = {
    data: null;
    error: {
        status: string;
        name: string;
        message: string;
        details: any;
    };
};

export type Res<T> = Req.Res<T, StrapiError>;

export async function send<T>(args: Req.Args): Promise<Res<T>> {
    const argsCopy = { ...args };
    argsCopy.path = `${backendURL}${args.path}`;
    if (args.auth) argsCopy.auth = `Bearer ${args.auth}`;

    return await req.send<T, StrapiError>({ ...argsCopy });
}
