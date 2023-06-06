export interface Runner {
    run(): void;
}

export interface ControllerStarter {
    start(): void
}

export interface UsecaseRegisterer {
    addUsecase(name: string, inports: Inport<any, any>): void

    getUsecase(nameStructType: string): Inport<any, any>
}

export interface ControllerRegisterer extends ControllerStarter, UsecaseRegisterer {
    registerRouter(): void
}

export class BaseController implements UsecaseRegisterer {
    inportObjs: any = {};

    addUsecase(name: string, inports: Inport<any, any>): void {
        this.inportObjs[name] = inports
    }

    getUsecase(name: string): Inport<any, any> {
        return (this.inportObjs[name] as Inport<any, any>)
    }
}

// export interface Inport<REQUEST, RESPONSE> {
//     Execute(request: REQUEST): Promise<RESPONSE>
// }

export type Inport<REQUEST, RESPONSE> = (request: REQUEST) => Promise<RESPONSE>