import {Inport} from "./usecase";
import {Context} from "../utility/application";
import {FindOneUserByUsername, ValidatePassword} from "../model/repository/user";
import {User} from "../model/entity/user";

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
]

export const executeLogin = (o: Outport): Inport<Request, Response> => {

    const [
        findOneUserByUsername,
        validatePassword,
    ] = o

    return async (ctx: Context, req: Request): Promise<Response> => {

        const user = await findOneUserByUsername(ctx, req.username)
        if (!user) {
            throw new Error('User not found')
        }

        const valid = await validatePassword(ctx, req.username, req.password)
        if (!valid) {
            throw new Error('Invalid password')
        }

        return {user: user}
    }
}
