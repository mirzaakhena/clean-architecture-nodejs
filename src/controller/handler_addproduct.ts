import {Inport} from "../usecase/usecase";
import {Request, Response} from "../usecase/execute_add_product";
import {DecodedRequest, getUser, HandlerFunc} from "./controller";
import {randomUUID} from "crypto";
import express from "express";
import {logger} from "../utility/logger";
import {getContext} from "../utility/application";

export const handleAddProduct = (executable: Inport<Request, Response>): HandlerFunc => {

    return async (req: DecodedRequest, res: express.Response) => {

        const ctx = getContext(handleAddProduct.name)

        try {

            const user = getUser(req)
            ctx.username = user.username

            logger.info(ctx, `called with ${JSON.stringify(req.body)}`)

            const result = await executable(ctx, {
                id: randomUUID(),
                name: req.body.name,
                price: req.body.price,
            })

            logger.info(ctx, `done with id ${result.id}`)

            return res.json(result)

        } catch (err) {

            logger.error(ctx, `fail. Causes : ${(err as Error).message}`)

            return res.status(400).send({
                message: (err as Error).message,
            });
        }

    };

}
