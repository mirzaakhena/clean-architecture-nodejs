import {DataSource} from "typeorm";
import {Product} from "../model/entity/product";
import {logger} from "../utility/logger";
import {Order} from "../model/entity/order";
import {getContext} from "../utility/application";
import {User, UserRole} from "../model/entity/user";

export const getDataSource = (): DataSource => {

    const entities = [
        Product,
        Order,
        User,
        UserRole,
    ]

    const dataSource = new DataSource({
        type: "sqlite",
        database: "database.sqlite",
        synchronize: true,
        logging: true,
        entities: entities,
        migrations: [],
        subscribers: [],
    })

    const ctx = getContext(getDataSource.name)

    dataSource.initialize()
        .then(() => logger.info(ctx, "database is connected..."))
        .catch((err) => logger.info(ctx, `problem in database connection : ${(err as Error).message}`))

    return dataSource
}