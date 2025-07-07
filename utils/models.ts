import {ReactNode} from "react";
import {CandlestickData} from "lightweight-charts";


export interface Children {
    children: ReactNode
}
export type ChartData = {
    data: CandlestickData[]
}