import express from "express";

export type HandlerFunc = (req: express.Request, res: express.Response) => void

export const runServer = (router : express.Router): void => {

    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(router)

    const port = process.env.SERVER_PORT

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })

}