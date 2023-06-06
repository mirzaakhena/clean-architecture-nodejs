import {ControllerRegisterer, Inport} from "../shared/framework_helper";
import {Request, Response} from "../usecase/add_product";
import {HandlerFunc} from "./controller";
import {randomUUID} from "crypto";

export const handleAddProduct = (ctrl: ControllerRegisterer): HandlerFunc => {
    return async (req, res) => {

        try {

            const inport = (ctrl.getUsecase("addProduct") as Inport<Request, Response>)

            const result = await inport.Execute({
                id: randomUUID(),
                name: req.body.name,
                price: req.body.price,
            })

            return res.json(result)

        } catch (err) {

            return res.status(400).send({
                message: (err as Error).message,
            });
        }

    };
};