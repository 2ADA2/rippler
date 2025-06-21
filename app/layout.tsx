import React from "react";
import './globals.scss'
import {Children} from "@/utils/models";
import StoreProvider from "@/app/StoreProvider";
import {Header} from "@/components/Header";
import {NextFont} from "next/dist/compiled/@next/font";
import { Inter } from 'next/font/google';


const inter:NextFont= Inter({
    subsets: ['latin'],
    weight: ['100', '400', '600'],
    variable: '--font-inter',
});


export default async function Layout({children}: Children) {

    return (
        <html lang="en" className={inter.className}>
        <body>
        <StoreProvider>
            <Header></Header>
            {children}
        </StoreProvider>

        </body>
        </html>
    )
}