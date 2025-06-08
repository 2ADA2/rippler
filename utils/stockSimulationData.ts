export interface IStockSimulationData {
    name:string;
    price:string[];
    grow:boolean[];
    diffPercent:number[];
    diffDollar:number[];
}
export const stockSimulationData:IStockSimulationData[] = [
    {
        "name": "Eth",
        "price": ["1453.40", "1460.61", "1452.00", "1455.80", "1454.98"],
        "grow": [false, true, false, true, false],
        "diffPercent": [0.10, 0.50, -0.59, 0.26, -0.06],
        "diffDollar": [1.58, 7.21, -8.61, 3.80, -0.82]
    },
    {
        "name": "Gold",
        "price": ["1920.50", "1922.10", "1918.40", "1921.00", "1923.50"],
        "grow": [false, true, false, true, true],
        "diffPercent": [0.16, 0.08, -0.19, 0.14, 0.13],
        "diffDollar": [3.00, 1.60, -3.70, 2.60, 2.50]
    },
    {
        "name": "Oil",
        "price": ["72.10", "71.80", "72.50", "72.10", "72.90"],
        "grow": [false, false, true, false, true],
        "diffPercent": [1.11, -0.42, 0.97, -0.55, 1.11],
        "diffDollar": [0.80, -0.30, 0.70, -0.40, 0.80]
    },
    {
        "name": "BTC",
        "price": ["27100.00", "27250.00", "27000.00", "27050.00", "27300.00"],
        "grow": [false, true, false, true, true],
        "diffPercent": [0.74, 0.55, -0.92, 0.19, 0.92],
        "diffDollar": [200.00, 150.00, -250.00, 50.00, 250.00]
    },
    {
        "name": "Silver",
        "price": ["23.40", "23.60", "23.55", "23.75", "23.65"],
        "grow": [false, true, false, true, false],
        "diffPercent": [1.07, 0.85, -0.21, 0.85, -0.42],
        "diffDollar": [0.25, 0.20, -0.05, 0.20, -0.10]
    }
]


