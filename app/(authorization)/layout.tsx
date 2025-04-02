"use client"
import {Children} from "@/utils/models";
import {redirect} from "next/navigation";
import {useAppSelector} from "@/lib/hooks";
import {Loading} from "@/components/loading";

export default function AuthLayout({children,}: Children) {
    const {isLoading, isLoggedIn, loadingStatus} = useAppSelector(state => state.userReducer)
    if(isLoggedIn){
        redirect("/dashboard")
    }
    if(isLoading){
        return <Loading loadingStatus={loadingStatus}/>;
    }
    return children
}