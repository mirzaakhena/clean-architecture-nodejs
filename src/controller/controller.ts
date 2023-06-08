import express from "express";
import {logger} from "../utility/logger";
import {getContext} from "../utility/application";
import {User} from "../model/entity/user";
import {handleError} from "./handle_error";

export type HandlerFunc = (req: express.Request, res: express.Response) => void

export interface DecodedRequest extends express.Request {
    user?: User;
}

export const getUser = (req: DecodedRequest): User => req.user as User

export const hasOneOfRoles = (user: User, roles: string[]): boolean => {
    const userRoles = user.roles as string[]
    for (const ur of userRoles) {
        if (roles.includes(ur)) {
            return true;
        }
    }
    return false;
}

export const runServer = (router: express.Router): void => {

    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(router)
    app.use(handleError)

    const port = process.env.SERVER_PORT

    app.listen(port, () => {
        logger.info(getContext(runServer.name), `Server is running on port ${port} ...`)
    })

}