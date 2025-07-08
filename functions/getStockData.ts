import axios from "axios";
import {API_URL} from "@/utils/env";
import {StockHistoryInterface} from "@/lib/globalInterfaces";
import {getCookie} from "typescript-cookie";

export async function getStockData():Promise<StockHistoryInterface> {
    const token = getCookie("token");
    const data: { data: { data: StockHistoryInterface } } = await axios.get(API_URL+"/getStockData", {
        headers:{
            "authorization":"Barer" + token
        }
    })
    return data.data.data
}
