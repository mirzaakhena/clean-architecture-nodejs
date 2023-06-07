import {Inport} from "../usecase/usecase";
import {Request, Response} from "../usecase/execute_getall_product";
import {HandlerFunc} from "./controller";
import express from "express";
import {logger} from "../utility/logger";

export const handleGetAllProduct = (executable: Inport<Request, Response>): HandlerFunc => {
    return async (req: express.Request, res: express.Response) => {

        try {

            const result = await executable({})

            logger.info(`handleGetAllProduct result count : ${result.count}`)

            return res.json(result)

        } catch (err) {

            logger.error(`handleGetAllProduct error : ${(err as Error).message}`)

            return res.status(400).send({
                message: (err as Error).message,
            });
        }

    };
};
