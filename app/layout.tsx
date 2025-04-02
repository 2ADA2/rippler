import React from "react";
import {Geist} from 'next/font/google'
import './globals.scss'
import {Children} from "@/utils/models";
import StoreProvider from "@/app/StoreProvider";
import {Header} from "@/components/Header";

const geist = Geist({
    subsets: ['latin'],
})
export default async function Layout({children}: Children) {

    return (
        <html lang="en" className={geist.className}>
        <body>
        <StoreProvider>
            <Header></Header>
            {children}
        </StoreProvider>

        </body>
        </html>
    )
}