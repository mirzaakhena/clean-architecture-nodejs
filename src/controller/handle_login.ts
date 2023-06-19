import {Inport} from "../usecase/usecase";
import {Request, RequestValidator, Response} from "../usecase/execute_login";
import express from "express";
import {logger} from "../utility/logger";
import {getContext} from "../utility/application";
import jwt from "jsonwebtoken";
import {HandlerFuncWithNext} from "./controller";

export const handleLogin = (executable: Inport<Request, Response>): HandlerFuncWithNext => {

    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const ctx = getContext(handleLogin.name)

        try {

            const result = await executable(ctx, new RequestValidator(
                req.body.username,
                req.body.password,
            ))

            const payload = {data: result.user}
            const secretKey = process.env.SECRET_KEY as string
            const expiration = {expiresIn: process.env.TOKEN_EXPIRATION}
            const token = jwt.sign(payload, secretKey, expiration);

            res.send({token: token})

            logger.info(ctx, `handleLogin called`)

        } catch (err) {
            logger.error(ctx, `handleLogin error`)
            next(err)
        }

    };

}
