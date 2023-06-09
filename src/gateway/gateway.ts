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
        .then(() => {
            logger.info(ctx, "database is connected...")
            insertSampleData(dataSource)
        })
        .catch((err) => logger.info(ctx, `problem in database connection : ${(err as Error).message}`))


    return dataSource
}

function insertSampleData(dataSource: DataSource) {

    const ctx = getContext(insertSampleData.name)

    dataSource.getRepository(User).count()
        .then((result) => {
            if (result > 0) {
                return
            }
            dataSource.getRepository(User)
                .save({username: "joni", name: "Joni",})
                .then(() => logger.info(ctx, "insert user"))
            dataSource.getRepository(User)
                .save({username: "aldo", name: "Aldo",})
                .then(() => logger.info(ctx, "insert user"))
        })

    dataSource.getRepository(UserRole).count()
        .then((result) => {
            if (result > 0) {
                return
            }
            dataSource.getRepository(UserRole)
                .save({username: "joni", role: "admin",})
                .then(() => logger.info(ctx, "insert user_role"))
            dataSource.getRepository(UserRole)
                .save({username: "aldo", role: "operator",})
                .then(() => logger.info(ctx, "insert user_role"))
        })
}