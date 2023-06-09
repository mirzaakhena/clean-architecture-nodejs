import {executeGetAllProduct, Request, Response} from "./execute_getall_product";
import {FindAllProducts} from "../model/repository/product";
import {Product} from "../model/entity/product";

describe('executeGetAllProduct', () => {
    it('should call findAllProducts once and return the correct response', async () => {
        const findAllProducts: jest.Mock<ReturnType<FindAllProducts>> = jest.fn().mockResolvedValueOnce([[new Product(), new Product()], 2]);
        const inport = executeGetAllProduct([findAllProducts]);

        const ctx = { funcName: 'test', traceId: '123' };
        const request: Request = {};

        const expectedResponse: Response = {
            data: [new Product(), new Product()],
            count: 2,
        };

        const response = await inport(ctx, request);

        expect(findAllProducts).toHaveBeenCalledTimes(1);
        expect(findAllProducts).toHaveBeenCalledWith(ctx);

        expect(response).toEqual(expectedResponse);
    });

    it('should throw an error if findAllProducts throws an error', async () => {
        const errorMessage = 'Error occurred while fetching products';
        const findAllProducts: jest.Mock<ReturnType<FindAllProducts>> = jest.fn().mockRejectedValueOnce(new Error(errorMessage));
        const inport = executeGetAllProduct([findAllProducts]);

        const ctx = { funcName: 'test', traceId: '123' };
        const request: Request = {};

        await expect(inport(ctx, request)).rejects.toThrow(errorMessage);

        expect(findAllProducts).toHaveBeenCalledTimes(1);
        expect(findAllProducts).toHaveBeenCalledWith(ctx);
    });
});