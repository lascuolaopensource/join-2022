import { UsersPermissionsUser } from "./strapi";
export interface User extends UsersPermissionsUser {
    id: string;
}
export declare type ID<T> = T & {
    id: string;
};
