import {Inport} from "../usecase/usecase";
import {Request, Response} from "../usecase/execute_getall_product";
import {HandlerFunc} from "./controller";
import express from "express";
import {logger} from "../utility/logger";
import {getContext} from "../utility/application";

export const handleGetAllProduct = (executable: Inport<Request, Response>): HandlerFunc => {
    return async (req: express.Request, res: express.Response) => {

        const ctx = getContext(handleGetAllProduct.name)

        try {

            const result = await executable(ctx, {})

            logger.info(ctx, ` result count : ${result.count}`)

            return res.json(result)

        } catch (err) {

            logger.error(ctx, ` error : ${(err as Error).message}`)

            return res.status(400).send({
                message: (err as Error).message,
            });
        }

    };
};
