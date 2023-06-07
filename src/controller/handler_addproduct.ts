import {Inport} from "../usecase/usecase";
import {Request, Response} from "../usecase/execute_add_product";
import {HandlerFunc} from "./controller";
import {randomUUID} from "crypto";
import express from "express";
import {logger} from "../utility/logger";

export const handleAddProduct = (executable: Inport<Request, Response>): HandlerFunc => {

    return async (req: express.Request, res: express.Response) => {

        try {

            logger.info(`handleAddProduct called with ${JSON.stringify(req.body)}`)

            const result = await executable({
                id: randomUUID(),
                name: req.body.name,
                price: req.body.price,
            })

            logger.info(`handleAddProduct done with id ${result.id}`)

            return res.json(result)

        } catch (err) {

            return res.status(400).send({
                message: (err as Error).message,
            });
        }

    };

}
