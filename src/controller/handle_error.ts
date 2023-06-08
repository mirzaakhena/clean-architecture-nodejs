import express from "express";
import {LogicError} from "../model/entity/error";
import {JsonWebTokenError, NotBeforeError, TokenExpiredError} from "jsonwebtoken";

export const handleError = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {

    if (err instanceof LogicError) {
        res.status(400).json({
            status: 400,
            message: err.message
        })
        return
    }

    const errorTypes = [JsonWebTokenError, NotBeforeError, TokenExpiredError];

    if (errorTypes.some(errorType => err instanceof errorType)) {
        res.sendStatus(401)
        return
    }

    return res.status(400).json({
        status: 400,
        message: err.message
    })
}