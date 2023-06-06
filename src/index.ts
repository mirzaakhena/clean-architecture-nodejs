import "reflect-metadata"
import {Controller} from "./controller/controller";
import {Interactor as addProduct} from "./usecase/add_product";
import {Interactor as getAllProduct} from "./usecase/getall_product";
import {FindAllProducts, SaveProduct} from "./model/repository/product";
import {FindAllProductsImpl, SaveProductImpl} from "./gateway/product";
import {DataSource} from "typeorm";
import {Product} from "./model/entity/product";

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

const saveProduct: SaveProduct = new SaveProductImpl(repo)
const findAllProducts: FindAllProducts = new FindAllProductsImpl(repo)

const ct = new Controller()

ct.addUsecase("addProduct", new addProduct(saveProduct))
ct.addUsecase("getAllProduct", new getAllProduct(findAllProducts))

ct.registerRouter()

ct.start()