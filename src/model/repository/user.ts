import {Context} from "../../utility/application";
import {User} from "../entity/user";

export type FindOneUserByUsername = (ctx: Context, username: string) => Promise<User | null>

export type ValidatePassword = (ctx: Context, username: string, password: string) => Promise<boolean>

export type FindAllUserRoles = (ctx: Context, username: string) => Promise<string[]>

