import express from "express";
import {logger} from "../utility/logger";

export type HandlerFunc = (req: express.Request, res: express.Response) => void

export const runServer = (router : express.Router): void => {

    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(router)

    const port = process.env.SERVER_PORT

    app.listen(port, () => {
        logger.info(`Server is running on port ${port} ...`)
    })

}