import {Product} from "../entity/product";

export type SaveProduct = (product: Product) => Promise<void>

export type FindAllProducts = () => Promise<[Product[], number]>