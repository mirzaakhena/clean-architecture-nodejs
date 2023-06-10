import {Inport} from "../usecase/usecase";
import {Request, Response} from "../usecase/execute_login";
import express from "express";
import {logger} from "../utility/logger";
import {getContext} from "../utility/application";
import jwt from "jsonwebtoken";
import {HandlerFuncWithNext} from "./controller";

export const handleLogin = (executable: Inport<Request, Response>): HandlerFuncWithNext => {

    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        try {

            const ctx = getContext(handleLogin.name)

            logger.info(ctx, `called with ${JSON.stringify(req.body)}`)

            const result = await executable(ctx, req.body)

            logger.info(ctx, `done with id ${result.user}`)

            const payload = {data: result.user}
            const secretKey = process.env.SECRET_KEY as string
            const expiration = {expiresIn: process.env.TOKEN_EXPIRATION}
            const token = jwt.sign(payload, secretKey, expiration);

            res.send(token)

        } catch (err) {
            next(err)
        }

    };

}
