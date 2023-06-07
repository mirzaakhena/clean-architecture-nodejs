import {Product} from "../entity/product";
import {Context} from "../../utility/application";

export type SaveProduct = (ctx: Context, product: Product) => Promise<void>

export type FindAllProducts = (ctx: Context) => Promise<[Product[], number]>
