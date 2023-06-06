import { Product } from "../entity/product";

export interface SaveProduct{
    saveProduct(product: Product): void
}

export interface FindAllProducts {
    findAllProducts(): Promise<[Product[], number]>
}
