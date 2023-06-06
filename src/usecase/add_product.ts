import {Inport} from "../shared/framework_helper";
import {Product} from "../model/entity/product";
import {SaveProduct} from "../model/repository/product";

export interface Request {
    id: string
    name: string
    price: number
}

export interface Response {
    id: string
}

export interface Outport extends SaveProduct {
}

export class Interactor implements Inport<Request, Response> {

    constructor(private readonly outport: Outport) {
    }

    async Execute({id, name, price}: Request): Promise<Response> {

        try {
            const obj = new Product()
            obj.id = id
            obj.name = name
            obj.price = price

            obj.validate()

            await this.outport.saveProduct(obj)

            return {id: obj.id}
        } catch (err) {
            throw err
        }


    }

}