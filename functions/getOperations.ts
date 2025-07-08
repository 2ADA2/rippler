import {OperationsHistoryInterface} from "@/lib/globalInterfaces";
import axios from "axios";
import {API_URL} from "@/utils/env";
import {getCookie} from "typescript-cookie";

export async function getOperations() {
    const token = getCookie("token");
    const data: {  data: OperationsHistoryInterface  } = await axios.get(API_URL+"/getOperations",{
        headers:{
            "authorization":'Bearer ' + token
        }
    });
    return data.data
}