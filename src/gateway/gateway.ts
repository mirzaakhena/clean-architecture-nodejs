import {DataSource} from "typeorm";
import {Product} from "../model/entity/product";
import {logger} from "../utility/logger";
import {Order} from "../model/entity/order";
import {getContext} from "../utility/application";

export const getDataSource = (): DataSource => {

    const dataSource = new DataSource({
        type: "sqlite",
        database: "database.sqlite",
        synchronize: true,
        logging: true,
        entities: [Product, Order],
        migrations: [],
        subscribers: [],
    })

    const ctx = getContext(getDataSource.name)

    dataSource.initialize()
        .then(() => logger.info(ctx, "database is connected..."))
        .catch((err) => logger.info(ctx, `problem in database connection : ${(err as Error).message}`))

    return dataSource
}