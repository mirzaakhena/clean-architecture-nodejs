import "reflect-metadata"
require('dotenv').config()

import express from "express";
import {runServer} from "./controller/controller";

import {ImplFindAllProducts, ImplSaveProduct} from "./gateway/impl_product";
import {getDataSource} from "./gateway/gateway";

import {executeAddProduct} from "./usecase/execute_add_product";
import {executeGetAllProduct} from "./usecase/execute_getall_product";

import {handleAddProduct} from "./controller/handler_addproduct";
import {handleGetAllProduct} from "./controller/handler_getallproduct";
import {ImplSaveOrder} from "./gateway/impl_order";
import {executeCreateOrder} from "./usecase/execute_create_order";
import {ImplWithTransaction} from "./gateway/impl_trx";
import {handleCreateOrder} from "./controller/handler_createorder";

const bootstrap = () => {

    const m = getDataSource()

    const withTrx = ImplWithTransaction(m)

    const saveOrder = ImplSaveOrder(m)
    const saveProduct = ImplSaveProduct(m)
    const findAllProducts = ImplFindAllProducts(m)

    const router = express.Router()

    router.post("/products", handleAddProduct(executeAddProduct([saveProduct])))
    router.get("/products", handleGetAllProduct(executeGetAllProduct([findAllProducts])))
    router.post("/order", handleCreateOrder(executeCreateOrder([saveProduct,saveOrder,withTrx])))

    runServer(router)
}

if (!process.env.SERVER_PORT) {

    const message = "Before running, please provide .env file and specify :\n\n" +
        "SERVER_PORT=\n" +
        "DATABASE_HOST=\n" +
        "DATABASE_NAME=\n" +
        "DATABASE_USER=\n" +
        "DATABASE_PASSWORD=\n"

    console.log(message)
    process.exit(1);
}

bootstrap()




