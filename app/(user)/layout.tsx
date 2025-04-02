"use client"
import {Children} from "@/utils/models";
import {redirect} from "next/navigation";
import {useAppSelector} from "@/lib/hooks";
import {Loading} from "@/components/loading";

export default function UserLayout({children}: Children) {
    const {isLoading, isLoggedIn, loadingStatus} = useAppSelector(state => state.userReducer)
    if(!isLoggedIn){
        redirect("/login")
    }
    if(isLoading){
        console.log("loading status");
        return <Loading loadingStatus={loadingStatus}/>;
    }

    return children
}