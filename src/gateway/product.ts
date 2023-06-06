import {FindAllProducts, SaveProduct} from "../model/repository/product";
import {Product} from "../model/entity/product";
import {DataSource, Repository} from "typeorm";
import exp from "constants";

export const getDataSource = ():DataSource => {
    const dataSource = new DataSource({
        type: "sqlite",
        database: "database.sqlite",
        synchronize: true,
        logging: false,
        entities: [Product],
        migrations: [],
        subscribers: [],
    })

    dataSource.initialize()
        .then(() => console.log("database connected..."))
        .catch((error) => console.log("Something Happen!!! ", error))

    return dataSource
}

export const SaveProductImpl = (repo: Repository<Product>) : SaveProduct => {
   return async (product: Product): Promise<void> => {
       try{
           await repo.save(product)
       } catch (err) {
           throw err
       }
   }
}

export const FindAllProductsImpl = (repo: Repository<Product>) : FindAllProducts => {
    return async (): Promise<[Product[], number]> => {
        try{
            return await repo.findAndCount()
        } catch (err) {
            throw err
        }
    }
}
