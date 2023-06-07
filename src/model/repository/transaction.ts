import {Context} from "../../utility/application";

export type WithTransaction = (ctx: Context, inTrx: (ctx: Context) => Promise<void>) => Promise<void>