import {Context} from "../../utility/application";

export type WithTransaction = <T>(ctx: Context, inTrx: (ctx: Context) => Promise<T>) => Promise<T>