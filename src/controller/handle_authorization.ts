import express from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {User} from "../model/entity/user";
import {DecodedRequest} from "./controller";

export type HandlerFuncWithNext = (req: express.Request, res: express.Response, next: express.NextFunction) => void

export const handleAuthorization = (): HandlerFuncWithNext => {

    return async (req: DecodedRequest, res: express.Response, next: express.NextFunction) => {

        try {

            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.sendStatus(401);
                return
            }

            const token = authHeader.split(' ');
            if (token.length !== 2) {
                res.sendStatus(401);
                return
            }

            const secretKey = process.env.SECRET_KEY as string
            const dataDecoded = jwt.verify(token[1], secretKey) as JwtPayload
            req.user = dataDecoded.data as User

            next();

        } catch (e) {
            next(e);
        }

    }

}
