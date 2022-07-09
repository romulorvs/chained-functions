interface BreakChainFunction { val: any }
export function breakChain(val: any): <T>(val: T) => ({ val: T });
export function chain(request: any, ...functions: Array<Function | BreakChainFunction>): (functions: Array<Function | BreakChainFunction>) => any;
export function asyncChain(request: any, ...functions: Array<Function | BreakChainFunction>): Promise<(functions: Array<Function | BreakChainFunction>) => any>;
