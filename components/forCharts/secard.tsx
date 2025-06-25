"use client"

import {Avatar, Card, CardContent, CardHeader, CardMedia} from "@mui/material";
import React from "react";
import Link from "next/link";

export interface SECardInterface {
    name: string,
    description: string,
    categories: string[],
}

export function SECard({name, description, categories}: SECardInterface) {
    return <Link href={"/stock_exchange/"+name.toLowerCase()}>
        <Card sx={{background: "black", marginTop: 4, width: "500px", color: "white"}}>
            <CardHeader
                avatar={
                    <Avatar src={"/ripplerico.svg"} sx={{width: 50}}/>
                }
                title={name}
            />
            <CardMedia
                component="img"
                height="200"
                image="/images/charts2.png"
                alt="Rippler own crypto"
            />
            <CardContent>
            </CardContent>
        </Card>
    </Link>
}