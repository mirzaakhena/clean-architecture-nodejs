import {Context} from "./application";

const pino = require('pino')
const pinoLogger = pino({
    transport: {
        target: 'pino-pretty'
    },
})

export class logger {

    static info = (ctx: Context, msg: string): void => {
        // pinoLogger.info(` ${ctx.traceId} ${ctx.funcName} ${msg}`)
        pinoLogger.info(` ${msg}`)
    }

    static error = (ctx: Context, msg: string): void => {
        // pinoLogger.error(` ${ctx.traceId} ${ctx.funcName} ${msg}`)
        pinoLogger.error(`${msg}`)
    }

}


