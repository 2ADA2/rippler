"use client"
import Link from "next/link";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {authorizeUser} from "@/lib/features/user/auth";
import {logoutUser} from "@/lib/features/user/logout";
import {userSlice} from "@/lib/features/user/UserSlice";
import {getCookie} from "typescript-cookie";
import Image from "next/image";
import NEXTIMG from "../public/nextico.svg"


export const Header = () => {
    const dispatch = useAppDispatch();
    const {setToken} = userSlice.actions
    const {isLoggedIn} = useAppSelector(state => state.userReducer)

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
        <header className="flex justify-between items-center gap-3">
            <a className={"rippler"}>Rippler</a>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/dashboard">User</Link>
                <Link href="/login">Sign in</Link>
                <Link href="/registration">Sign up</Link>
                <button onClick={logout}>logout</button>
            </nav>
            <div className={"grid grid-cols-2 grid-rows-3 user-header-info"}>
                {isLoggedIn && <>
                    <a>ada</a>
                    <span>0E</span>
                    <span>0R</span>
                    <a className={"user-header-img"}>
                        <Image
                            src={NEXTIMG}
                            width={"50"}
                            height={"50"}
                            alt="Rippler logo"
                            className={"user-header-img"}
                        />
                    </a>
                </>}
                <>
                    <Link href="/login">login</Link>
                    <span>0E</span>
                    <span>0R</span>
                    <a className={"user-header-img"}>
                        <Image
                            src={NEXTIMG}
                            width={"50"}
                            height={"50"}
                            alt="Rippler logo"
                            className={"user-header-img"}
                        />
                    </a>
                </>
            </div>
        </header>
    );
};
