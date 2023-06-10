import {Inport} from "../usecase/usecase";
import {Request, Response} from "../usecase/execute_add_product";
import {DecodedRequest, getUser, HandlerFuncWithNext, hasOneOfRoles} from "./controller";
import {randomUUID} from "crypto";
import express, {NextFunction} from "express";
import {logger} from "../utility/logger";
import {getContext} from "../utility/application";

export const handleAddProduct = (executable: Inport<Request, Response>): HandlerFuncWithNext => {

    return async (req: DecodedRequest, res: express.Response, next: NextFunction) => {

        const ctx = getContext(handleAddProduct.name)

        try {

            const user = getUser(req)

            if (!hasOneOfRoles(user, ["admin"])) {
                res.sendStatus(403);
                return
            }

            logger.info(ctx, `handleAddProduct called with ${JSON.stringify(req.body)}`)

            const result = await executable(ctx, {
                id: randomUUID(),
                name: req.body.name,
                price: req.body.price,
            })

            logger.info(ctx, `handleAddProduct done with id ${result.id}`)

            res.json(result)

        } catch (err) {
            logger.error(ctx, `handleAddProduct error`)
            next(err)

        }

    }

}
