"use client"
import {Children} from "@/utils/models";
import {redirect} from "next/navigation";
import {useAppSelector} from "@/lib/hooks";
import {Loading} from "@/components/loading";
import "./login.scss"

export default function AuthLayout({children,}: Children) {
    const {isLoading, isLoggedIn, loadingStatus} = useAppSelector(state => state.userReducer)
    if(isLoading){
        return <Loading loadingStatus={loadingStatus}/>;
    }
    if(isLoggedIn){
        redirect("/dashboard")
    } else{
        return children
    }
}