import {Children} from "@/utils/models";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function AuthLayout({children,}: Children) {
    const cookieService = await cookies()
    const token = cookieService.get("token")
    if(token){
        redirect("/dashboard")
    }

    return children
}