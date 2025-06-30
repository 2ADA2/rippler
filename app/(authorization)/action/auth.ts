import axios from "axios";
import {API_URL} from "@/utils/env";
import {redirect} from "next/navigation";
import {getUserData} from "@/functions/getUserData";
import {setCookie} from "typescript-cookie";


export async function signup(e:React.MouseEvent<HTMLButtonElement>, username:string, password:string):Promise<string|null> {
    e.preventDefault();
    const url:string = API_URL

    const res = await axios.post(url+"/register", {username, password})

    if (res.status === 200) {
        redirect("/login");
        return null
    }
    return res.data.error
}

export async function signin(e:React.MouseEvent<HTMLButtonElement>,username:string, password:string, callback:() => void) {
    e.preventDefault();
    const url:string = API_URL

    const res = await axios.post(url+"/login", {username, password})

    if (res.data.token) {
        getUserData(res.data.token).then(async function (data)  {
            setCookie("token", res.data.token);
            callback()
            redirect("/dashboard")
            return null
        })
    }
    return res.data.error
}