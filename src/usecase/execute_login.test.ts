import {executeLogin, Outport, Request, Response} from "./execute_login";
import {User} from "../model/entity/user";
import {Context} from "../utility/application";
import {LogicError} from "../model/entity/error";

describe('executeLogin', () => {
    const mockedFindOneUserByUsername: jest.Mock<Promise<User | null>, [Context, string]> = jest.fn();
    const mockedValidatePassword: jest.Mock<Promise<boolean>, [Context, string, string]> = jest.fn();
    const mockedFindAllUserRoles: jest.Mock<Promise<string[]>, [Context, string]> = jest.fn();

    const outport: Outport = [
        mockedFindOneUserByUsername,
        mockedValidatePassword,
        mockedFindAllUserRoles,
    ];

    const ctx: Context = {
        funcName: 'test',
        traceId: '123',
    };

    const user: User = {
        username: 'testUser',
        name: 'John Doe',
        roles: undefined,
    };

    beforeEach(() => {
        mockedFindOneUserByUsername.mockReset();
        mockedValidatePassword.mockReset();
        mockedFindAllUserRoles.mockReset();
    });

    test('should return user when all operations are successful', async () => {
        mockedFindOneUserByUsername.mockResolvedValueOnce(user);
        mockedValidatePassword.mockResolvedValueOnce(true);
        mockedFindAllUserRoles.mockResolvedValueOnce(['role1', 'role2']);

        const login = executeLogin(outport);
        const request: Request = {
            username: 'testUser',
            password: 'password',
        };

        const response = await login(ctx, request);

        expect(mockedFindOneUserByUsername).toHaveBeenCalledTimes(1);
        expect(mockedFindOneUserByUsername).toHaveBeenCalledWith(ctx, 'testUser');

        expect(mockedValidatePassword).toHaveBeenCalledTimes(1);
        expect(mockedValidatePassword).toHaveBeenCalledWith(ctx, 'testUser', 'password');

        expect(mockedFindAllUserRoles).toHaveBeenCalledTimes(1);
        expect(mockedFindAllUserRoles).toHaveBeenCalledWith(ctx, 'testUser');

        expect(response).toEqual({ user: { ...user, roles: ['role1', 'role2'] } });
    });

    test('should throw LogicError when user is not found', async () => {
        mockedFindOneUserByUsername.mockResolvedValueOnce(null);

        const login = executeLogin(outport);
        const request: Request = {
            username: 'testUser',
            password: 'password',
        };

        await expect(login(ctx, request)).rejects.toThrow(LogicError);
        expect(mockedFindOneUserByUsername).toHaveBeenCalledTimes(1);
        expect(mockedFindOneUserByUsername).toHaveBeenCalledWith(ctx, 'testUser');
        expect(mockedValidatePassword).not.toHaveBeenCalled();
        expect(mockedFindAllUserRoles).not.toHaveBeenCalled();
    });

    test('should throw LogicError when password is invalid', async () => {
        mockedFindOneUserByUsername.mockResolvedValueOnce(user);
        mockedValidatePassword.mockResolvedValueOnce(false);

        const login = executeLogin(outport);
        const request: Request = {
            username: 'testUser',
            password: 'password',
        };

        await expect(login(ctx, request)).rejects.toThrow(LogicError);
        expect(mockedFindOneUserByUsername).toHaveBeenCalledTimes(1);
        expect(mockedFindOneUserByUsername).toHaveBeenCalledWith(ctx, 'testUser');
        expect(mockedValidatePassword).toHaveBeenCalledTimes(1);
        expect(mockedValidatePassword).toHaveBeenCalledWith(ctx, 'testUser', 'password');
        expect(mockedFindAllUserRoles).not.toHaveBeenCalled();
    });

    test('should throw LogicError when user roles are not found', async () => {
        mockedFindOneUserByUsername.mockResolvedValueOnce(user);
        mockedValidatePassword.mockResolvedValueOnce(true);
        mockedFindAllUserRoles.mockResolvedValueOnce([]);

        const login = executeLogin(outport);
        const request: Request = {
            username: 'testUser',
            password: 'password',
        };

        await expect(login(ctx, request)).rejects.toThrow(LogicError);
        expect(mockedFindOneUserByUsername).toHaveBeenCalledTimes(1);
        expect(mockedFindOneUserByUsername).toHaveBeenCalledWith(ctx, 'testUser');
        expect(mockedValidatePassword).toHaveBeenCalledTimes(1);
        expect(mockedValidatePassword).toHaveBeenCalledWith(ctx, 'testUser', 'password');
        expect(mockedFindAllUserRoles).toHaveBeenCalledTimes(1);
        expect(mockedFindAllUserRoles).toHaveBeenCalledWith(ctx, 'testUser');
    });

});
