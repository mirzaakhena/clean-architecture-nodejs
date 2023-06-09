import "reflect-metadata"

import express from "express";
import {runServer} from "./controller/controller";
import {getDataSource} from "./gateway/gateway";

import {executeAddProduct} from "./usecase/execute_add_product";
import {executeGetAllProduct} from "./usecase/execute_getall_product";
import {executeCreateOrder} from "./usecase/execute_create_order";
import {executeLogin} from "./usecase/execute_login";

import {handleAddProduct} from "./controller/handle_addproduct";
import {handleGetAllProduct} from "./controller/handle_getallproduct";
import {handleCreateOrder} from "./controller/handle_createorder";
import {handleLogin} from "./controller/handle_login";
import {handleAuthorization} from "./controller/handle_authorization";

import {ImplFindAllProducts, ImplSaveProduct} from "./gateway/impl_product";
import {ImplFindAllUserRoles, ImplFindOneUserByUsername, ImplValidatePassword} from "./gateway/impl_user";
import {ImplSaveOrder} from "./gateway/impl_order";
import {ImplWithTransaction} from "./gateway/impl_trx";

const bootstrap = () => {

    const m = getDataSource()

    const findOneUserByUsername = ImplFindOneUserByUsername(m)
    const validatePassword = ImplValidatePassword()

    const withTrx = ImplWithTransaction(m)
    const saveOrder = ImplSaveOrder(m)
    const saveProduct = ImplSaveProduct(m)
    const findAllProducts = ImplFindAllProducts(m)
    const findAllUserRoles = ImplFindAllUserRoles(m)

    const router = express.Router()

    router.use("/api/v1", handleAuthorization());
    router.post("/api/v1/products", handleAddProduct(executeAddProduct([saveProduct])))
    router.get("/api/v1/products", handleGetAllProduct(executeGetAllProduct([findAllProducts])))
    router.post("/api/v1/order", handleCreateOrder(executeCreateOrder([saveProduct, saveOrder, withTrx])))
    router.post("/login", handleLogin(executeLogin([findOneUserByUsername, validatePassword, findAllUserRoles])))

    runServer(router)
}

require('dotenv').config()

if (!process.env.SERVER_PORT) {

    const message = "Before running, please provide .env file and specify :\n\n" +
        "SERVER_PORT=\n" +
        "DATABASE_HOST=\n" +
        "DATABASE_NAME=\n" +
        "DATABASE_USER=\n" +
        "DATABASE_PASSWORD=\n" +
        "SECRET_KEY=\n" +
        "TOKEN_EXPIRATION=\n"

    console.log(message)
    process.exit(1);
}

bootstrap()




