import {Inport} from "../shared/framework_helper";
import {Product} from "../model/entity/product";
import {FindAllProducts} from "../model/repository/product";

export interface Request {
}

export interface Response {
    data: Product[]
    count: number
}

export interface Outport extends FindAllProducts {
}

export class Interactor implements Inport<Request, Response> {

    constructor(private readonly outport: Outport) {
    }

    async Execute(req: Request): Promise<Response> {
        const [products, count] = await this.outport.findAllProducts()
        return {data: products, count: count}
    }

}