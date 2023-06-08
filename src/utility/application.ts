import {randomUUID} from "crypto";

export interface Context {
    funcName: string;
    traceId: string;
    data?: any;
}

export const getContext = (funcName: string): Context => {
    return {
        funcName: funcName,
        traceId: randomUUID(),
        data: null,
    }
}