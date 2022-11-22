import { Request as Req } from "../request";
export declare const backendURL = "http://localhost:1337/api";
export declare function send<T>(args: Req.Args): Promise<T>;
