export declare type ID<T> = T & {
    id: string;
};
export declare type Comp<T> = Partial<T> & {
    __component: string;
};
