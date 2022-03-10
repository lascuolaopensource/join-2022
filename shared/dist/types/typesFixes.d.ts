import { UsersPermissionsMe } from "./types";
export declare type ID<T> = T & {
    id: string;
};
export declare type Comp<T> = Partial<T> & {
    __component: string;
};
export interface LoginResponse {
    jwt?: string;
    user: UsersPermissionsMe;
}
