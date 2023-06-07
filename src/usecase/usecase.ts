import {Context} from "../utility/application";

export type Inport<REQUEST, RESPONSE> = (ctx: Context, request: REQUEST) => Promise<RESPONSE>
