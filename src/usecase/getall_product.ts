import {Inport} from "../shared/framework_helper";
import {Product} from "../model/entity/product";
import {FindAllProducts} from "../model/repository/product";

export interface Request {
}

export interface Response {
    data: Product[]
    count: number
}

type Outport = [FindAllProducts]

export const getAllProduct = (outport: Outport): Inport<Request, Response> => {

    const [findAllProducts] = outport

    return async (req: Request): Promise<Response> => {
        const [products, count] = await findAllProducts()
        return {data: products, count: count}
    }
}