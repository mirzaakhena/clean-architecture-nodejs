import {DataSource, Equal} from "typeorm";
import {Context} from "../utility/application";
import {getManager} from "./impl_trx";
import {FindAllUserRoles, FindOneUserByUsername, ValidatePassword} from "../model/repository/user";
import {User, UserRole} from "../model/entity/user";

export const ImplFindOneUserByUsername = (ds: DataSource): FindOneUserByUsername => {
    return async (ctx: Context, username: string): Promise<User | null> => {

        // TODO: this line has a bug when username is null or undefined!
        //  https://github.com/typeorm/typeorm/issues/9316
        // return await getManager(ctx, ds.manager).findOneBy(User, {username});

        // alternatively
        // return await getManager(ctx, ds.manager).getRepository(User)
        //     .createQueryBuilder("user")
        //     .where("user.username = :username", {username})
        //     .getOne()

        return await getManager(ctx, ds.manager).findOneBy(User, {username: Equal(username)});
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
        return (await getManager(ctx, ds.manager).findBy(UserRole, {username})).map(ur => ur.role)
    }
}
