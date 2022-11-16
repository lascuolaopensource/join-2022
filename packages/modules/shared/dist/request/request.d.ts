import { ErrorHandler, Data, Args } from "./types";
export declare const defaultErrorHandler: ErrorHandler;
export declare function send<Res = Data>({ method, path, data, auth, fetchImpl, errorHandler, }: Args): Promise<Res>;
