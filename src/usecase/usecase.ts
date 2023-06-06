

export type Inport<REQUEST, RESPONSE> = (request: REQUEST) => Promise<RESPONSE>
