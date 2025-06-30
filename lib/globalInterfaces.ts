export interface CurrencyInterface {
    name: string;
    shortName: string;
    count: number;
    coefficient: number;
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