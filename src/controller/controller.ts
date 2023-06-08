import express from "express";
import {logger} from "../utility/logger";
import {getContext} from "../utility/application";
import {User} from "../model/entity/user";

export type HandlerFunc = (req: express.Request, res: express.Response) => void

export interface DecodedRequest extends express.Request {
    user?: User;
}

export const getUser = (req: DecodedRequest): User => {
    if (!req.user) {
        throw new Error("user is not defined")
    }
    return req.user as User
}

export const runServer = (router: express.Router): void => {

    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(router)

    const port = process.env.SERVER_PORT

    app.listen(port, () => {
        logger.info(getContext(runServer.name), `Server is running on port ${port} ...`)
    })

}