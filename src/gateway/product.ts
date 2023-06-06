import {FindAllProducts, SaveProduct} from "../model/repository/product";
import {Product} from "../model/entity/product";
import {Repository} from "typeorm";

export class SaveProductImpl implements SaveProduct {

    constructor(private readonly repo: Repository<Product>) {
    }

    async do(product: Product): Promise<void> {
        try {
            await this.repo.save(product)
        } catch (err) {
            throw err
        }
    }

}

export class FindAllProductsImpl implements FindAllProducts {

    constructor(private readonly repo: Repository<Product>) {
    }

    async do(): Promise<[Product[], number]> {
        try{
            return await this.repo.findAndCount()
        } catch (err) {
            throw err
        }
    }

}