import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryColumn()
    username: string = ""

    @Column()
    name: string = ""

    roles?: string[];

}

@Entity()
export class UserRole {

    @PrimaryColumn()
    username: string = ""

    @Column()
    role: string = ""
}