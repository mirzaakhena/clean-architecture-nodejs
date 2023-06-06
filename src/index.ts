import "reflect-metadata"
import {runServer} from "./controller/controller";
import {FindAllProducts, SaveProduct} from "./model/repository/product";
import {FindAllProductsImpl, SaveProductImpl} from "./gateway/impl_product";
import {getDataSource} from "./gateway/gateway";
import {Product} from "./model/entity/product";
import {addProduct} from "./usecase/add_product";
import {getAllProduct} from "./usecase/getall_product";
import express from "express";
import {handleAddProduct} from "./controller/handler_addproduct";
import {handleGetAllProduct} from "./controller/handler_getallproduct";

const repo = getDataSource().getRepository(Product)

const saveProduct: SaveProduct = SaveProductImpl(repo)
const findAllProducts: FindAllProducts = FindAllProductsImpl(repo)

const router = express.Router()

router.post("/products", handleAddProduct(addProduct([saveProduct])))
router.get("/products", handleGetAllProduct(getAllProduct([findAllProducts])))

runServer(router)