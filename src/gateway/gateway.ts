import {DataSource} from "typeorm";
import {Product} from "../model/entity/product";

export const getDataSource = ():DataSource => {
    const dataSource = new DataSource({
        type: "sqlite",
        database: "database.sqlite",
        synchronize: true,
        logging: false,
        entities: [Product],
        migrations: [],
        subscribers: [],
    })

    dataSource.initialize()
        .then(() => console.log("database connected..."))
        .catch((error) => console.log("Something Happen!!! ", error))

    return dataSource
}