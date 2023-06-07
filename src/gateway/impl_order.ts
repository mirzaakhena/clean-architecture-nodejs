import {SaveOrder} from "../model/repository/order";
import {DataSource} from "typeorm";
import {Order} from "../model/entity/order";
import {Context} from "../utility/application";
import {getManager} from "./impl_trx";

export const ImplSaveOrder = (ds: DataSource) : SaveOrder => {
    return async (ctx: Context, order: Order): Promise<void> => {
        try{
            await getManager(ctx, ds.manager).save(order)
        } catch (err) {
            throw err
        }
    }
}




