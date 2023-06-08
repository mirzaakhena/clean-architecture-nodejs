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

            const token = authHeader.split(' ')[1];
            const secretKey = process.env.SECRET_KEY as string
            const dataDecoded = jwt.verify(token, secretKey) as JwtPayload
            if (!dataDecoded) {
                res.sendStatus(401);
                return
            }

            req.user = dataDecoded.data as User

            next();

        } catch (err) {
            res.sendStatus(401);
        }

    }

}