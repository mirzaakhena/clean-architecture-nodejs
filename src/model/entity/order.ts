import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Order {

    @PrimaryColumn()
    id: string = "";

    @Column()
    name: string = "";

}