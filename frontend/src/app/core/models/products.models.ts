export interface LsProduct{
    id: string,
    name: string,
    description: string,
    logo: string,
    date_release: Date,
    date_revision: Date
}

export interface LsResCreate{
    message: string,
    data: LsProduct
}

export interface LsResMessage{
    message: string
}

export interface LsResAll{
    data: LsProduct[]
}