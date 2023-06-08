import {DataSource} from "typeorm";
import {Context} from "../utility/application";
import {getManager} from "./impl_trx";
import {FindAllUserRoles, FindOneUserByUsername, ValidatePassword} from "../model/repository/user";
import {User, UserRole} from "../model/entity/user";


export const ImplFindOneUserByUsername = (ds: DataSource): FindOneUserByUsername => {
    return async (ctx: Context, username: string): Promise<User | null> => {
        return await getManager(ctx, ds.manager).findOneBy(User, {username})
    }
}

export const ImplValidatePassword = (): ValidatePassword => {
    return async (ctx: Context, username: string, password: string): Promise<boolean> => {
        // TODO: temporary implementation
        return (username === password)
    }
}

export const ImplFindAllUserRoles = (ds: DataSource): FindAllUserRoles => {
    return async (ctx: Context, username: string): Promise<string[]> => {
        return (await getManager(ctx, ds.manager).findBy(UserRole, {username})).map(ur => {
            return ur.role
        })
    }
}
