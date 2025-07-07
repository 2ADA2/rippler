import {CurrencyDataInterface} from "@/lib/globalInterfaces";

export const NAMES: Record<string, string> = {
    euro: "Euro",
    rippler: "Rippler",
    innovate: "Innovate",
    kilowatt: "Kilowatt",
    ada: "ADA",
};

export const CURRENCYDATA: Record<string, CurrencyDataInterface> = {
    "Euro": {
        name: "Euro",
        shortName: "EUR",
        code: 0
    },
    "Rippler": {
        name: "Rippler",
        shortName: "RPL",
        code: 1
    },
    "Innovate": {
        name: "Innovate",
        shortName: "INN",
        code: 2
    },
    "Kilowatt": {
        name: "Kilowatt",
        shortName: "KWT",
        code: 3
    },
    "ADA": {
        name: "ADA",
        shortName: "ADA",
        code: 4
    },
}
