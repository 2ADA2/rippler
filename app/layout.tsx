import React from "react";
import {JetBrains_Mono} from 'next/font/google'
import './globals.scss'
import {Children} from "@/utils/models";
import StoreProvider from "@/app/StoreProvider";
import {Header} from "@/components/Header";
import {NextFont} from "next/dist/compiled/@next/font";

const jb:NextFont = JetBrains_Mono({
    subsets: ["greek"],
})
export default async function Layout({children}: Children) {

    return (
        <html lang="en" className={jb.className}>
        <body>
        <StoreProvider>
            <Header></Header>
            {children}
        </StoreProvider>

        </body>
        </html>
    )
}