import "reflect-metadata"

import express from "express";
import {runServer} from "./controller/controller";

import {Product} from "./model/entity/product";

import {ImplFindAllProducts, ImplSaveProduct} from "./gateway/impl_product";
import {getDataSource} from "./gateway/gateway";

import {executeAddProduct} from "./usecase/execute_add_product";
import {executeGetAllProduct} from "./usecase/execute_getall_product";

import {handleAddProduct} from "./controller/handler_addproduct";
import {handleGetAllProduct} from "./controller/handler_getallproduct";

const bootstrap = () => {

    const repo = getDataSource().getRepository(Product)

    const saveProduct = ImplSaveProduct(repo)
    const findAllProducts = ImplFindAllProducts(repo)

    const router = express.Router()

    router.post("/products", handleAddProduct(executeAddProduct([saveProduct])))
    router.get("/products", handleGetAllProduct(executeGetAllProduct([findAllProducts])))

    runServer(router)
}

bootstrap()




