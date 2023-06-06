import {BaseController, ControllerRegisterer, UsecaseRegisterer} from "../shared/framework_helper";
import express from "express";
import {routeHandler} from "./router";

export type HandlerFunc = (req: express.Request, res: express.Response) => void

export class Controller extends BaseController implements ControllerRegisterer {

    router: express.Router = express.Router();

    start(): void {
        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }));

        app.use(this.router)

        const port = 3000

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    }

    registerRouter(): void {
        routeHandler(this, this.router)
    }

}

