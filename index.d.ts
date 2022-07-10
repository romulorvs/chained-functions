export function addLink<T>(val: T): () => T;
export function breakChain<T>(val: T): T;
export function chain(...functions): any;
export function asyncChain(...functions): Promise<any>;