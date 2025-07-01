import axios from "axios";
import {API_URL} from "@/utils/env";
import {StockHistoryInterface} from "@/lib/globalInterfaces";

export async function createOperation(token:string, type:string, count:number, currency:string) {
    const data:any = await axios.post(API_URL+"/operation", {
        type,
        count,
        currency
    },{
        headers:{
            "authorization":token
        }
    })
    console.log(data)
}
