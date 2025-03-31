import React from "react";
import {Geist} from 'next/font/google'
import './globals.scss'
import Link from "next/link";
import {Children} from "@/utils/models";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import StoreProvider from "@/app/StoreProvider";

const geist = Geist({
    subsets: ['latin'],
})
export default function Layout({children}: Children) {
    async function logout(){
        const cookieService = await cookies()
        cookieService.delete("token")
        redirect("/login")
    }
    return (
        <html lang="en" className={geist.className}>
        <body>
        <header className="flex gap-3 p-5">
            <Link href="/">Home</Link>
            <Link href="/dashboard">User</Link>
            <Link href="/login">Sign in</Link>
            <Link href="/registration">Sign up</Link>
        </header>
        <StoreProvider>
            {children}
        </StoreProvider>
        </body>
        </html>
    )
}