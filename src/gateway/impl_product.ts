import {FindAllProducts, SaveProduct} from "../model/repository/product";
import {Product} from "../model/entity/product";
import {DataSource} from "typeorm";
import {Context} from "../utility/application";
import {getManager} from "./impl_trx";

export const ImplSaveProduct = (ds: DataSource): SaveProduct => {
    return async (ctx: Context, product: Product): Promise<void> => {
        await getManager(ctx, ds.manager).save(product)
    }
}

export const ImplFindAllProducts = (ds: DataSource): FindAllProducts => {
    return async (ctx: Context): Promise<[Product[], number]> => {
        return await getManager(ctx, ds.manager).findAndCount(Product)
    }
}
