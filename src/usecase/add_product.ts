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

export class Interactor implements Inport<Request, Response> {

    constructor(private readonly saveProduct: SaveProduct) {
    }

    async Execute({id, name, price}: Request): Promise<Response> {

        try {
            const obj = new Product()
            obj.id = id
            obj.name = name
            obj.price = price

            obj.validate()

            await this.saveProduct(obj)

            return {id: obj.id}
        } catch (err) {
            throw err
        }


    }

}