import {Inport} from "../usecase/usecase";
import {Request, Response} from "../usecase/execute_create_order";
import {DecodedRequest, getUser, HandlerFuncWithNext, hasOneOfRoles} from "./controller";
import {randomUUID} from "crypto";
import express from "express";
import {logger} from "../utility/logger";
import {getContext} from "../utility/application";

export const handleCreateOrder = (executable: Inport<Request, Response>): HandlerFuncWithNext => {

    return async (req: DecodedRequest, res: express.Response, next: express.NextFunction) => {

        const ctx = getContext(handleCreateOrder.name)

        try {

            const user = getUser(req)

            if (!hasOneOfRoles(user, ["admin", "operator"])) {
                res.sendStatus(403);
                return
            }

            logger.info(ctx, `handleCreateOrder called with ${JSON.stringify(req.body)}`)

            const result = await executable(ctx, {
                id: randomUUID(),
                name: req.body.name,
                price: req.body.price,
                username: user.username,
            })

            logger.info(ctx, `handleCreateOrder done with orderId ${result.orderId} and productId ${result.productId}`)

            res.json(result)

        } catch (err) {
            logger.error(ctx, `handleCreateOrder error`)
            next(err)
        }


    };

}
