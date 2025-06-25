"use client"
import Link from "next/link";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {authorizeUser} from "@/lib/features/user/auth";
import {logoutUser} from "@/lib/features/user/logout";
import {userSlice} from "@/lib/features/user/UserSlice";
import {getCookie} from "typescript-cookie";
import Image from "next/image";
import RIPPLERIMG from "../public/ripplerico.svg"
import {Tab, Tabs} from "@mui/material";


export const Header = () => {
    const dispatch = useAppDispatch();
    const {setToken} = userSlice.actions
    const {isLoggedIn, euro, rippler} = useAppSelector(state => state.userReducer)

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
            <Link href={"/"} className={"rippler flex gap-2"}>
                <Image
                    src={RIPPLERIMG}
                    width={"50"}
                    height={"50"}
                    alt="Rippler logo"
                    className={"user-header-img"}
                />
                Rippler
            </Link>
            <nav>
                <Link href ={"/stock_exchange"}>Stock exchange</Link>
                <Link href = {"/trade"}>Trade</Link>
                <Link href = {"/finance"}>Finance</Link>
                <Link href = {"/markets"}>Markets</Link>
                <Link href = {"/about"}>About</Link>
            </nav>
            <div className={"grid grid-cols-2 grid-rows-3 user-header-info"}>
                {isLoggedIn && <>
                    <Link href={"/dashboard"}>ada</Link>
                    <Link href={"/wallet"}>{euro} €</Link>
                    <Link href ={"/donate"}>0 R</Link>
                    <a className={"user-header-img"}>
                        <Image
                            src={RIPPLERIMG}
                            width={"50"}
                            height={"50"}
                            alt="Rippler logo"
                            className={"user-header-img"}
                        />
                    </a>
                </>}
                <>
                    <Link href="/login">login</Link>
                    <Link href="/login">{euro} €</Link>
                    <Link href="/login">{rippler} R</Link>
                    <a className={"user-header-img"}>
                        <Image
                            src={RIPPLERIMG}
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
