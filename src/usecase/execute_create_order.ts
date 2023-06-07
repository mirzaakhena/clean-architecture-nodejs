import {Inport} from "./usecase";
import {Product} from "../model/entity/product";
import {SaveProduct} from "../model/repository/product";
import {Order} from "../model/entity/order";
import {Context} from "../utility/application";
import {SaveOrder} from "../model/repository/order";
import {WithTransaction} from "../model/repository/transaction";

export interface Request {
    id: string
    name: string
    price: number
}

export interface Response {

}

export type Outport = [SaveProduct, SaveOrder, WithTransaction]

export const executeCreateOrder = (o: Outport): Inport<Request, Response> => {

    const [
        saveProduct,
        saveOrder,
        withTransaction,
    ] = o

    return async (ctx: Context, req: Request): Promise<Response> => {

        await withTransaction(ctx, async (ctx: Context) => {

            const objOrder = new Order()
            objOrder.id = req.id
            objOrder.name = "ooo " + req.name
            await saveOrder(ctx, objOrder)

            const objProduct = new Product()
            objProduct.name = req.name
            objProduct.price = req.price
            objProduct.id = req.id

            objProduct.validate()

            await saveProduct(ctx, objProduct)

        })

        return {id: ""}

    }
}
