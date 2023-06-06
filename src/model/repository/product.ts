import { Product } from "../entity/product";

export interface SaveProduct{
    do(product: Product): void
}

export interface FindAllProducts {
    do(): Promise<[Product[], number]>
}
