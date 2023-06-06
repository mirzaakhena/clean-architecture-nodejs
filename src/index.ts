import "reflect-metadata"
import {Controller} from "./controller/controller";
import {FindAllProducts, SaveProduct} from "./model/repository/product";
import {FindAllProductsImpl, SaveProductImpl} from "./gateway/product";
import {DataSource} from "typeorm";
import {Product} from "./model/entity/product";
import {addProduct} from "./usecase/add_product";
import {getAllProduct} from "./usecase/getall_product";

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

const repo = dataSource.getRepository(Product)

const saveProduct: SaveProduct = SaveProductImpl(repo)
const findAllProducts: FindAllProducts = FindAllProductsImpl(repo)

const ct = new Controller()

ct.addUsecase("addProduct", addProduct(saveProduct))
ct.addUsecase("getAllProduct", getAllProduct(findAllProducts))

ct.registerRouter()

ct.start()