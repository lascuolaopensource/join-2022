import { Request as Req } from "../request";
export declare const backendURL = "http://localhost:1337/api";
export declare const errorHandler: Req.ErrorHandler;
export declare function send<Res>(args: Req.Args): Promise<Res>;
