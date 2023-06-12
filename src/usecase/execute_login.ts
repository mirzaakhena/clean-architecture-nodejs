import {Inport} from "./usecase";
import {Context} from "../utility/application";
import {FindAllUserRoles, FindOneUserByUsername, ValidatePassword} from "../model/repository/user";
import {User} from "../model/entity/user";
import {LogicError} from "../model/entity/error";

export interface Request {
    username: string
    password: string
}

// TODO i dont like this, because we have to write the fields from Request interface multiple
//  the better solution is, write the Request directly as a class instead of using interface
export class RequestValidator implements Request {

    password: string;
    username: string;

    constructor(username: string, password: string,) {
        this.username = username;
        this.password = password;
        if (!this.username || !this.password) {
            throw new LogicError('missing username or password')
        }
    }

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

        // if (!req.username || !req.password) {
        //     throw new LogicError('missing username or password')
        // }

        const user = await findOneUserByUsername(ctx, req.username)
        if (!user) {
            throw new LogicError('User not found')
        }

        const valid = await validatePassword(ctx, req.username, req.password)
        if (!valid) {
            throw new LogicError('Invalid password')
        }

        const roles = await findAllUserRoles(ctx, req.username)
        if (roles.length === 0) {
            throw new LogicError('User Role not found')
        }

        user.roles = roles

        return {user: user}
    }
}
