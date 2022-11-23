import { Args, Res } from "./types";
export declare function send<T, E = any>({ method, path, data, auth, fetchImpl, }: Args): Promise<Res<T, E>>;
