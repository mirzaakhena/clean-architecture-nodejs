import express from "express";
import {ControllerRegisterer} from "../shared/framework_helper";
import {handleAddProduct} from "./handler_addproduct";
import {handleGetAllProduct} from "./handler_getallproduct";

export const routeHandler = (ctrl: ControllerRegisterer, router: express.Router) => {
    router.post("/products", handleAddProduct(ctrl))
    router.get("/products", handleGetAllProduct(ctrl))
}