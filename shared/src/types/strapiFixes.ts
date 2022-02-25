export type ID<T> = T & { id: string };
export type Comp<T> = Partial<T> & { __component: string };
