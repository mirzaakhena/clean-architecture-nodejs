import "reflect-metadata"

import express from "express";
import {runServer} from "./controller/controller";

import {Product} from "./model/entity/product";

import {FindAllProductsImpl, SaveProductImpl} from "./gateway/impl_product";
import {getDataSource} from "./gateway/gateway";

import {addProduct} from "./usecase/execute_add_product";
import {getAllProduct} from "./usecase/execute_getall_product";

import {handleAddProduct} from "./controller/handler_addproduct";
import {handleGetAllProduct} from "./controller/handler_getallproduct";

const bootstrap = () => {

    const repo = getDataSource().getRepository(Product)

    const saveProduct = SaveProductImpl(repo)
    const findAllProducts = FindAllProductsImpl(repo)

    const router = express.Router()

    router.post("/products", handleAddProduct(addProduct([saveProduct])))
    router.get("/products", handleGetAllProduct(getAllProduct([findAllProducts])))

    runServer(router)
}

bootstrap()




