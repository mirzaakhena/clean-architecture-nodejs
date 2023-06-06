import "reflect-metadata"
import {Gateway} from "./gateway/gateway_impl";
import {Controller} from "./controller/controller";
import {Interactor as addProduct} from "./usecase/add_product";
import {Interactor as getAllProduct} from "./usecase/getall_product";

const gw = new Gateway()

const ct = new Controller()

ct.addUsecase("addProduct", new addProduct(gw))
ct.addUsecase("getAllProduct", new getAllProduct(gw))

ct.registerRouter()

ct.start()