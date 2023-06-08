import {DataSource} from "typeorm";
import {Context} from "../utility/application";
import {getManager} from "./impl_trx";
import {CreateToken, FindOneUserByUsername, ValidatePassword, VerifyToken} from "../model/repository/user";
import {User} from "../model/entity/user";


export const ImplFindOneUserByUsername = (ds: DataSource): FindOneUserByUsername => {
    return async (ctx: Context, username: string): Promise<User | null> => {
        return await getManager(ctx, ds.manager).findOneBy(User, {
            username: username,
        })
    }
}

export const ImplValidatePassword = (): ValidatePassword => {
    return async (ctx: Context, username: string, password: string): Promise<boolean> => {

        // TODO: temporary implementation
        return (username === password)

    }
}
