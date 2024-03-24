export type Listener<T> = (payload: T) => void | Promise<void>;

export type ExtractKeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? T[K] : never;
};

export type Methods<T> = ExtractKeysOfType<T, (...args: any[]) => any>;
