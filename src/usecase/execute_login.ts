import {Inport} from "./usecase";
import {Context} from "../utility/application";
import {FindAllUserRoles, FindOneUserByUsername, ValidatePassword} from "../model/repository/user";
import {User} from "../model/entity/user";
import {LogicError} from "../model/entity/error";

export interface Request {
    username: string
    password: string
}

export interface Response {
    user: User
}

export type Outport = [
    FindOneUserByUsername,
    ValidatePassword,
    FindAllUserRoles,
]

export const executeLogin = (o: Outport): Inport<Request, Response> => {

    const [
        findOneUserByUsername,
        validatePassword,
        findAllUserRoles,
    ] = o

    return async (ctx: Context, req: Request): Promise<Response> => {

        const user = await findOneUserByUsername(ctx, req.username)
        if (!user) {
            throw new LogicError('User not found')
        }

        const valid = await validatePassword(ctx, req.username, req.password)
        if (!valid) {
            throw new LogicError('Invalid password')
        }

        const roles = await findAllUserRoles(ctx, req.username)
        if (!roles) {
            throw new LogicError('User Role not found')
        }

        user.roles = roles

        return {user: user}
    }
}
