import {ControllerRegisterer, Inport} from "../shared/framework_helper";
import {Request, Response} from "../usecase/getall_product";
import {HandlerFunc} from "./controller";

export const handleGetAllProduct = (ctrl: ControllerRegisterer): HandlerFunc => {
    return async (req, res) => {

        try {

            const inport = (ctrl.getUsecase("getAllProduct") as Inport<Request, Response>)

            const result = await inport.Execute({})

            return res.json(result)

        } catch (err) {

            return res.status(400).send({
                message: (err as Error).message,
            });
        }

    };
};