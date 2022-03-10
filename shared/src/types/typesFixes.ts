import { UsersPermissionsMe } from "./types";

export type ID<T> = T & { id: string };

export type Comp<T> = Partial<T> & { __component: string };

export interface LoginResponse {
	jwt?: string;
	user: UsersPermissionsMe;
}
