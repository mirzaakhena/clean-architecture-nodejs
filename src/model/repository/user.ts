import {Context} from "../../utility/application";
import {User} from "../entity/user";


export type FindOneUserByUsername = (ctx: Context, username: string) => Promise<User | null>

export type ValidatePassword = (ctx: Context, username: string, password: string) => Promise<boolean>

export type CreateToken = (ctx: Context, user: User) => Promise<string>

export type VerifyToken = (ctx: Context, token: string) => Promise<User | null>