export type LoadError = { error: string | undefined };
export type LoadReturn<T> = Promise<T | LoadError | undefined>;
