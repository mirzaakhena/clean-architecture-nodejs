import {Inport} from "./usecase";
import {Product} from "../model/entity/product";
import {FindAllProducts} from "../model/repository/product";
import {Context} from "../utility/application";

export interface Request {
}

export interface Response {
    data: Product[]
    count: number
}

export type Outport = [FindAllProducts]

export const executeGetAllProduct = ([findAllProducts]: Outport): Inport<Request, Response> => {

    return async (ctx: Context, _: Request): Promise<Response> => {
        const [products, count] = await findAllProducts(ctx)
        return {data: products, count: count}
    }

}