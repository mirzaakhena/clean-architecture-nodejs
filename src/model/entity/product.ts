import {Column, Entity, PrimaryColumn} from "typeorm";
import {LogicError} from "./error";

@Entity()
export class Product {

    @PrimaryColumn()
    id: string = "";

    @Column()
    name: string = "";

    @Column()
    price: number = 0;

    validate(): void {

        if (!this.name?.length) {
            throw new LogicError("Name is required");
        }

        if (!this.price || this.price <= 0) {
            throw new LogicError("Price is required");
        }

    }

}