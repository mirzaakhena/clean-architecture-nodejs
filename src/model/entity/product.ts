import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Product {

    @PrimaryColumn()
    id: string = "";

    @Column()
    name: string = "";

    @Column()
    price: number = 0;

    validate() {

        if (this.name === undefined || this.name?.length === 0) {
            throw new Error("Name is required");
        }

        if (this.price === undefined || this.price <= 0) {
            throw new Error("Price is required");
        }

    }

}