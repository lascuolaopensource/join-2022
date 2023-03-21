import { Request as Req } from "../request";
export declare const backendURL = "http://localhost:1337/api";
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
export declare function send<T>(args: Req.Args): Promise<Res<T>>;
