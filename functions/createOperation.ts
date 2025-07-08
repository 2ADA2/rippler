import axios from "axios";
import {API_URL} from "@/utils/env";
import {CreateOperationInterface, WalletInterface} from "@/lib/globalInterfaces";

export async function createOperation(token:string, type:string, count:number, currency:string):Promise<CreateOperationInterface> {
    const data:any = await axios.post(API_URL+"/operation", {
        type,
        count,
        currency
    },{
        headers:{
            "authorization":'Bearer ' + token
        }
    })
    return data.data
}
