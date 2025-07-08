"use client"

import {Avatar, Card, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import React from "react";
import Link from "next/link";
import {Box} from "@mui/system";
import {IMAGES} from "@/utils/images";
import Image from "next/image";

export interface SECardInterface {
    name: string,
    description: string,
    categories: string[],
}

export function SECard({name, description, categories}: SECardInterface) {
    return <Link href={"/stock_exchange/" + name.toLowerCase()}>
        <Card sx={{background: "black", marginTop: 4, width: "500px", color: "white"}}>
            <CardHeader
                avatar={
                    <Image
                        src={IMAGES[name.toLowerCase()]}
                        alt={"Rippler own crypto"}
                        width = {50}
                        height = {50}
                        className={"rounded-xl"}
                    />
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
                {categories.map((category, index) => {
                    return (
                        <Box key ={index}>
                            <Typography
                                variant="caption"
                                key = {index}
                                style = {{backgroundColor: "#131617"}}
                                className={"rounded-xs p-1"}
                            >
                                {category}
                            </Typography>
                        </Box>
                    )
                })}
            </CardContent>
        </Card>
    </Link>
}