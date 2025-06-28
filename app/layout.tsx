import React from "react";
import './globals.scss'
import {Children} from "@/utils/models";
import StoreProvider from "@/app/StoreProvider";
import {Header} from "@/components/Header";
import {NextFont} from "next/dist/compiled/@next/font";
import { Inter } from 'next/font/google';
import {ThemeProvider} from "@mui/material";
import {mainTheme} from "@/lib/theme/theme";


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
            <ThemeProvider theme={mainTheme}>
                <Header></Header>
                {children}
            </ThemeProvider>
        </StoreProvider>

        </body>
        </html>
    )
}