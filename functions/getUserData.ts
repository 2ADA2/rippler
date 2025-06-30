import axios from "axios";
import {API_URL} from "@/utils/env";
import {GetUserDataInterface} from "@/lib/globalInterfaces";

export async function getUserData(token:string) {
    const data: { data:GetUserDataInterface } = await axios.get(API_URL+"/getUserData", {
        headers:{
            'authorization': 'Bearer ' + token,
        }
    })
    return data.data
}
