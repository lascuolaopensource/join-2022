import { Args, Res } from "./types";
export declare function send({ method, path, data, auth, fetchImpl, }: Args): Promise<Res>;
