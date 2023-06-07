import {FindAllProducts, SaveProduct} from "../model/repository/product";
import {Product} from "../model/entity/product";
import {Repository} from "typeorm";

export const ImplSaveProduct = (repo: Repository<Product>) : SaveProduct => {
   return async (product: Product): Promise<void> => {
       try{
           await repo.save(product)
       } catch (err) {
           throw err
       }
   }
}

export const ImplFindAllProducts = (repo: Repository<Product>) : FindAllProducts => {
    return async (): Promise<[Product[], number]> => {
        try{
            return await repo.findAndCount()
        } catch (err) {
            throw err
        }
    }
}
