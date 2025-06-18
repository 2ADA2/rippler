import {ReactNode} from "react";
import {CandlestickData} from "lightweight-charts";

interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    category: string;
}
export interface Children {
    children: ReactNode
}
export type ChartData = {
    data: CandlestickData[]
}