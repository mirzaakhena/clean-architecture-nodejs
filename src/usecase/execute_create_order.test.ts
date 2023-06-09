import { executeCreateOrder, Request, Response, Outport } from '../usecase/execute_create_order';
import { Context } from '../utility/application';
import { Product } from '../model/entity/product';
import { Order } from '../model/entity/order';
import {SaveProduct} from "../model/repository/product";
import {SaveOrder} from "../model/repository/order";
import {WithTransaction} from "../model/repository/transaction";

// Mock the dependencies
const saveProductMock: jest.Mock<Promise<void>> = jest.fn();
const saveOrderMock: jest.Mock<Promise<void>> = jest.fn();
const withTransactionMock: jest.Mock<Promise<any>> = jest.fn();

// Create a mocked Outport
const mockedOutport: Outport = [
    saveProductMock,
    saveOrderMock,
    withTransactionMock
];

describe('executeCreateOrder', () => {
    let inport: ReturnType<typeof executeCreateOrder>;

    beforeEach(() => {
        // Reset the mock functions before each test
        saveProductMock.mockReset();
        saveOrderMock.mockReset();
        withTransactionMock.mockReset();

        // Create a new inport function for each test
        inport = executeCreateOrder(mockedOutport);
    });

    test('should create order and product successfully', async () => {
        // Set up the input request
        const request: Request = {
            id: '123',
            name: 'Product A',
            price: 9.99,
            username: 'user123'
        };

        // Set up the expected response
        const expectedResponse: Response = {
            orderId: 'order-123',
            productId: 'product-123'
        };

        // Set up the expected order and product objects
        const expectedOrder = new Order();
        expectedOrder.id = 'order-123';
        expectedOrder.username = 'user123';

        const expectedProduct = new Product();
        expectedProduct.id = 'product-123';
        expectedProduct.name = 'Product A';
        expectedProduct.price = 9.99;

        // Mock the withTransaction function to execute the provided callback immediately
        withTransactionMock.mockImplementation(async (_ctx: Context, callback: (ctx: Context) => Promise<any>) => {
            return await callback(_ctx);
        });

        // Call the inport function
        const response = await inport({ funcName: 'test', traceId: '123' }, request);

        // Assert the response
        expect(response).toEqual(expectedResponse);

        // Assert saveOrder has been called with the expected arguments
        expect(saveOrderMock).toHaveBeenCalledTimes(1);
        expect(saveOrderMock).toHaveBeenCalledWith({ funcName: 'test', traceId: '123' }, expectedOrder);

        // Assert saveProduct has been called with the expected arguments
        expect(saveProductMock).toHaveBeenCalledTimes(1);
        expect(saveProductMock).toHaveBeenCalledWith({ funcName: 'test', traceId: '123' }, expectedProduct);
    });

    test('should throw an error if name is missing', async () => {
        // Set up the input request with missing name
        const request: Request = {
            id: '123',
            name: '', // Empty name
            price: 9.99,
            username: 'user123'
        };

        // Mock the withTransaction function to execute the provided callback immediately
        withTransactionMock.mockImplementation(async (_ctx: Context, callback: (ctx: Context) => Promise<any>) => {
            return await callback(_ctx);
        });

        // Call the inport function and expect it to throw an error
        await expect(inport({ funcName: 'test', traceId: '123' }, request)).rejects.toThrow('Name is required');

        // Assert saveOrder has been called
        expect(saveOrderMock).toHaveBeenCalled();

        // Assert saveProduct has not been called
        expect(saveProductMock).not.toHaveBeenCalled();
    });

    test('should throw an error if price is missing or zero', async () => {
        // Set up the input request with missing or zero price
        const requests: Request[] = [
            {
                id: '123',
                name: 'Product A',
                price: 0, // Zero price
                username: 'user123'
            },
            {
                id: '123',
                name: 'Product A',
                price: -9.99, // Negative price
                username: 'user123'
            }
        ];

        // Mock the withTransaction function to execute the provided callback immediately
        withTransactionMock.mockImplementation(async (_ctx: Context, callback: (ctx: Context) => Promise<any>) => {
            return await callback(_ctx);
        });

        // Call the inport function for each request and expect it to throw an error
        for (const request of requests) {
            await expect(inport({ funcName: 'test', traceId: '123' }, request)).rejects.toThrow('Price is required');
        }

        // Assert saveOrder has been called
        expect(saveOrderMock).toHaveBeenCalled();

        // Assert saveProduct has not been called
        expect(saveProductMock).not.toHaveBeenCalled();
    });

    // Add more test cases for different scenarios as needed

});