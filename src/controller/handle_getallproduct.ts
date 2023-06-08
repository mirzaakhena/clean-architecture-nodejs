import {Inport} from "../usecase/usecase";
import {Request, Response} from "../usecase/execute_getall_product";
import {DecodedRequest, getUser, HandlerFunc} from "./controller";
import express from "express";
import {logger} from "../utility/logger";
import {getContext} from "../utility/application";

export const handleGetAllProduct = (executable: Inport<Request, Response>): HandlerFunc => {
    return async (req: DecodedRequest, res: express.Response) => {

        const ctx = getContext(handleGetAllProduct.name)

        try {

            const user = getUser(req)
            ctx.username = user.username

            const result = await executable(ctx, {})

            logger.info(ctx, ` called by ${user.username} result count : ${result.count}`)

            return res.json(result)

        } catch (err) {

            logger.error(ctx, ` error : ${(err as Error).message}`)

            return res.status(400).send({
                message: (err as Error).message,
            });
        }

    };
};
