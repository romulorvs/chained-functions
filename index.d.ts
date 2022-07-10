export function addLink<T>(val: T): () => T;
export function breakChain<T>(val: T): T;
export function chain<T>(...functions): T;
export function asyncChain<T>(...functions): Promise<T>;