import {Inport} from "./usecase";
import {Product} from "../model/entity/product";
import {SaveProduct} from "../model/repository/product";
import {Context} from "../utility/application";

export interface Request {
    id: string
    name: string
    price: number
}

export interface Response {
    id: string
}

export type Outport = [SaveProduct]

export const executeAddProduct = ([saveProduct]: Outport): Inport<Request, Response> => {

    return async (ctx: Context, {id, name, price}: Request): Promise<Response> => {
        const obj = new Product()
        obj.id = id
        obj.name = name
        obj.price = price

        obj.validate()

        await saveProduct(ctx, obj)

        return {id: obj.id}
    }
}
