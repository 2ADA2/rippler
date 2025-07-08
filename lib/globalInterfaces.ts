export interface CurrencyInterface {
    name: string;
    shortName: string;
    count: number;
    coefficient: number;
    code:number,
}
export interface CurrencyDataInterface {
    name: string;
    shortName: string;
    code:number,
}

export interface GetUserDataInterface {
    username: string;
    imgUrl: string;
    wallet:WalletInterface;
}

export interface WalletInterface {
    username: string;
    wallet:CurrencyInterface[]
}

export interface StockOneInterface {
    time: string
    high: number
    low: number
    open: number
    close: number
}

export interface GetWalletInterface {
    imgUrl:string,
    username:string,
    wallet:WalletInterface
}

export interface StockInterface {
    [key: string]: StockOneInterface;
}
export interface StockHistoryInterface {
    [key: string]: StockOneInterface[];
}
export interface OperationInterface{
    time: string,
    currency: string,
    currencyAmount: number,
    euroAmount: number,
    currencyPrice: number,
}
export interface OperationsHistoryInterface {
    username: string,
    operations: OperationInterface[],
}
export interface CreateOperationInterface {
    wallet:CurrencyInterface[],
    operations:OperationInterface[],
}