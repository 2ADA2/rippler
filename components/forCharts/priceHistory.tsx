"use client"
import {Box} from "@mui/system";
import {CurrencyInterface, StockOneInterface} from "@/lib/globalInterfaces";
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import {useEffect, useState} from "react";
import {useAppSelector} from "@/lib/hooks";
import {CURRENCYDATA} from "@/utils/names";
import {Card, CardHeader, Icon, Typography} from "@mui/material";
import Image from "next/image";
import {IMAGES} from "@/utils/images";
import {formatter} from "@/utils/formatter";

export interface FormattedPricesInterface {
    name: string,
    shortName: string,
    price: string,
    priceChange: string,
    percents: string,
    isUp: boolean | "-",
}

export function PriceHistory({currency}:{currency:CurrencyInterface}) {
    const {stockData} = useAppSelector(state => state.stockReducer);

    useEffect(() => {
    }, [stockData])

    if (!stockData) {
        return <Box style={{width: '100%', height: '200px'}} className={"priceTable"}/>
    }

    return (
        <Card className={"flex flex-col gap-1 w-full priceTable mt-0 mb-5"} sx={{maxHeight:"500px", overflowY:"auto", scrollbarColor: "#263238 rgb(17, 17, 17)"}}>
            <CardHeader>
                <Image
                    src ={IMAGES[currency.name.toLowerCase()]}
                    alt = "icon"
                    width = {40}
                    height={40}
                />
                <Typography variant={"h5"}>{currency.name}</Typography>
            </CardHeader>
            {stockData[currency.name].map((e) => {
                return (
                 <Box>
                    1
                 </Box>
                )
            })}
        </Card>
    );
};
