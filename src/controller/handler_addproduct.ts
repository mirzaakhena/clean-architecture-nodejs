import {Inport} from "../shared/framework_helper";
import {Request, Response} from "../usecase/add_product";
import {HandlerFunc} from "./controller";
import {randomUUID} from "crypto";
import express from "express";

export const handleAddProduct = (executable: Inport<Request, Response>): HandlerFunc => {

    return async (req: express.Request, res: express.Response) => {

        try {

            const result = await executable({
                id: randomUUID(),
                name: req.body.name,
                price: req.body.price,
            })

            return res.json(result)

        } catch (err) {

            return res.status(400).send({
                message: (err as Error).message,
            });
        }

    };

}
