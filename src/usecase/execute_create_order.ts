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
    username: string
}

export interface Response {
    orderId: string
    productId: string
}

export type Outport = [SaveProduct, SaveOrder, WithTransaction]

export const executeCreateOrder = (o: Outport): Inport<Request, Response> => {

    const [saveProduct, saveOrder, withTransaction,] = o

    return async (ctx: Context, req: Request): Promise<Response> => {

        return await withTransaction(ctx, async (ctx: Context): Promise<Response> => {

            const objOrder = new Order()
            objOrder.id = `order-${req.id}`
            objOrder.username = req.username
            await saveOrder(ctx, objOrder)

            const objProduct = new Product()
            objProduct.id = `product-${req.id}`
            objProduct.name = req.name
            objProduct.price = req.price
            objProduct.validate()

            await saveProduct(ctx, objProduct)

            return {
                orderId: objOrder.id,
                productId: objProduct.id,
            }

        })

    }
}
