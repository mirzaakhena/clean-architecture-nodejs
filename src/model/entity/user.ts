import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryColumn()
    username: string = ""

    @Column()
    roles: string = ""
}

