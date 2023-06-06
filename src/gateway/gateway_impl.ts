import {FindAllProducts, SaveProduct} from "../model/repository/product";
import {Product} from "../model/entity/product";
import {DataSource, Repository} from "typeorm";

export class Gateway implements SaveProduct, FindAllProducts {

    productRepo: Repository<Product>

    constructor() {

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

        this.productRepo = dataSource.getRepository(Product)
    }

    async saveProduct(product: Product): Promise<void> {
        try {
            await this.productRepo.save(product)
        } catch (err) {
            throw err
        }
    }

    async findAllProducts(): Promise<[Product[], number]> {

        try{
            return await this.productRepo.findAndCount()
        } catch (err) {
            throw err
        }

    }

}