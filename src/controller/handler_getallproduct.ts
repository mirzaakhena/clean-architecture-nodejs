import {Inport} from "../shared/framework_helper";
import {Request, Response} from "../usecase/getall_product";
import {HandlerFunc} from "./controller";
import express from "express";

export const handleGetAllProduct = (executable: Inport<Request, Response>): HandlerFunc => {
    return async (req: express.Request, res: express.Response) => {

        try {

            const result = await executable({})

            return res.json(result)

        } catch (err) {

            return res.status(400).send({
                message: (err as Error).message,
            });
        }

    };
};