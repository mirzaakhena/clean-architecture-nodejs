import {Inport} from "../usecase/usecase";
import {Request, Response} from "../usecase/execute_login";
import {HandlerFunc} from "./controller";
import express from "express";
import {logger} from "../utility/logger";
import {getContext} from "../utility/application";
import jwt from "jsonwebtoken";

export const handleLogin = (executable: Inport<Request, Response>): HandlerFunc => {

    return async (req: express.Request, res: express.Response) => {

        const ctx = getContext(handleLogin.name)

        try {

            logger.info(ctx, `called with ${JSON.stringify(req.body)}`)

            const result = await executable(ctx, req.body)

            logger.info(ctx, `done with id ${result.user}`)

            const payload = {data: result.user}
            const secretKey = process.env.SECRET_KEY as string
            const expiration = {expiresIn: process.env.TOKEN_EXPIRATION}
            const token = jwt.sign(payload, secretKey, expiration);

            return res.json({token: token})

        } catch (err) {

            logger.error(ctx, `fail. Causes : ${(err as Error).message}`)

            return res.status(400).send({
                message: (err as Error).message,
            });
        }

    };

}
