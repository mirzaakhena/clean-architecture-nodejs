import {DataSource, EntityManager} from "typeorm";
import {WithTransaction} from "../model/repository/transaction";
import {Context} from "../utility/application";

export const ImplWithTransaction = (ds: DataSource): WithTransaction => {
    return async (ctx: Context, inTrx: (_: Context) => Promise<void>): Promise<void> => {
        return await ds.transaction(em => inTrx({...ctx, data: ds.manager}))
    }
}

export const getManager = (ctx: Context, em: EntityManager): EntityManager => {
    return ctx.data as EntityManager ? ctx.data : em
}


