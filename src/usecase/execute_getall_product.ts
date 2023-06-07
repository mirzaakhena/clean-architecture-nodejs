import {Inport} from "./usecase";
import {Product} from "../model/entity/product";
import {FindAllProducts} from "../model/repository/product";

export interface Request {
}

export interface Response {
    data: Product[]
    count: number
}

export type Outport = [FindAllProducts]

export const executeGetAllProduct = ([findAllProducts]: Outport): Inport<Request, Response> => {

    return async (_: Request): Promise<Response> => {
        const [products, count] = await findAllProducts()
        return {data: products, count: count}
    }

}