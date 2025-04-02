"use client"
import Link from "next/link";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {authorizeUser} from "@/lib/features/user/auth";
import {logoutUser} from "@/lib/features/user/logout";
import {userSlice} from "@/lib/features/user/UserSlice";
import {getCookie} from "typescript-cookie";
import {redirect} from "next/navigation";

export const Header = () => {
    const dispatch = useAppDispatch();
    const {setToken} = userSlice.actions

    useEffect(() => {
        const token = getCookie("token");
        dispatch(setToken({token}))
        dispatch(authorizeUser).then(res => {
        })
    }, []);


    const logout = () => {
        dispatch(logoutUser)
    }
    return (
        <header className="flex gap-3 p-5">
            <Link href="/">Home</Link>
            <Link href="/dashboard">User</Link>
            <Link href="/login">Sign in</Link>
            <Link href="/registration">Sign up</Link>
            <button onClick={logout}>logout</button>
        </header>

    );
};
