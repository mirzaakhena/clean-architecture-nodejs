import {executeAddProduct, Request, Response} from "./execute_add_product";
import {Product} from "../model/entity/product";
import {SaveProduct} from "../model/repository/product";

describe('executeAddProduct', () => {
    let saveProduct: SaveProduct;

    beforeEach(() => {
        // Create a mock implementation for the saveProduct function
        saveProduct = jest.fn();
    });

    it('should add a product and return the response', async () => {
        const request: Request = {
            id: '123',
            name: 'Test Product',
            price: 9.99,
        };

        const context = {
            funcName: 'addProduct',
            traceId: '123456',
        };

        // Call the executeAddProduct function
        const result: Response = await executeAddProduct([saveProduct])(context, request);

        // Assert that the saveProduct function was called with the correct arguments
        expect(saveProduct).toHaveBeenCalledWith(context, expect.any(Product));

        // Assert that the response contains the correct product ID
        expect(result.id).toEqual(request.id);
    });

    it('should throw an error if name is missing', async () => {
        const request: Request = {
            id: '123',
            name: '', // Empty name
            price: 9.99,
        };

        const context = {
            funcName: 'addProduct',
            traceId: '123456',
        };

        // Call the executeAddProduct function and expect it to throw an error
        await expect(executeAddProduct([saveProduct])(context, request)).rejects.toThrow('Name is required');

        // Assert that the saveProduct function was not called
        expect(saveProduct).not.toHaveBeenCalled();
    });

    it('should throw an error if price is missing or zero', async () => {
        const request: Request = {
            id: '123',
            name: 'Test Product',
            price: 0, // Zero price
        };

        const context = {
            funcName: 'addProduct',
            traceId: '123456',
        };

        // Call the executeAddProduct function and expect it to throw an error
        await expect(executeAddProduct([saveProduct])(context, request)).rejects.toThrow('Price is required');

        // Assert that the saveProduct function was not called
        expect(saveProduct).not.toHaveBeenCalled();
    });
});