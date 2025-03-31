
import {Children} from "@/utils/models";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function UserLayout({children}: Children) {
    const cookieService = await cookies()
    const token = cookieService.get("token")
    if(!token){
        redirect("/login")
    }

    return children
}