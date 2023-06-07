import {Order} from "../entity/order";
import {Context} from "../../utility/application";

export type SaveOrder = (ctx: Context, order: Order) => Promise<void>
