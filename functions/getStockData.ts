import axios from "axios";
import {API_URL} from "@/utils/env";
import {StockHistoryInterface} from "@/lib/globalInterfaces";

export async function getStockData() {
    const data: { data:StockHistoryInterface } = await axios.get(API_URL+"/getStockData")
    return data.data.data
}
