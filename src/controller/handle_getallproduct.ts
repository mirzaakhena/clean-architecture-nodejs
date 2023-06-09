import {Inport} from "../usecase/usecase";
import {Request, Response} from "../usecase/execute_getall_product";
import {DecodedRequest, getUser, hasOneOfRoles} from "./controller";
import express from "express";
import {logger} from "../utility/logger";
import {getContext} from "../utility/application";
import {HandlerFuncWithNext} from "./handle_authorization";

export const handleGetAllProduct = (executable: Inport<Request, Response>): HandlerFuncWithNext => {
    return async (req: DecodedRequest, res: express.Response, next: express.NextFunction) => {

        try {

            const ctx = getContext(handleGetAllProduct.name)

            const user = getUser(req)

            if (!hasOneOfRoles(user,["admin", "operator"])) {
                res.sendStatus(403);
                return
            }

            const result = await executable(ctx, {})

            logger.info(ctx, ` called by ${user.username} result count : ${result.count}`)

            res.json(result)

        } catch (err) {
            next(err)
        }



    };
};