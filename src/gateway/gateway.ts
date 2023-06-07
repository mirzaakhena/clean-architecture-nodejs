import {DataSource} from "typeorm";
import {Product} from "../model/entity/product";
import {logger} from "../utility/logger";

export const getDataSource = (): DataSource => {

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
        .then(() => logger.info("database is connected..."))
        .catch((error) => logger.info("problem in database connection : ", error))

    return dataSource
}