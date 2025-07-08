"use client"
import {Box} from "@mui/system";
import {CurrencyInterface, StockOneInterface} from "@/lib/globalInterfaces";
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import {useEffect, useMemo, useState} from "react";
import {useAppSelector} from "@/lib/hooks";
import {CURRENCYDATA} from "@/utils/names";
import {Card, CardContent, CardHeader, Icon, Typography} from "@mui/material";
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

export function PriceHistory({currency}: { currency: CurrencyInterface }) {
    const {stockData} = useAppSelector(state => state.stockReducer);
    const data = useMemo(() => {
        return stockData
    }, [stockData])

    if (!stockData) {
        return <Box style={{width: '100%', height: '200px'}} className={"priceTable"}/>
    }

    return (
        <Card className={"flex flex-col gap-1 w-full priceTable mt-0 mb-5 pt-15 relative"}>
            <CardHeader
                className={"absolute top-0 left-0 w-full"}
                sx = {{backdropFilter:"blur(10px)", backgroundColor:"rgb(17, 17, 17)"}}
                avatar={
                    <Image
                        src={IMAGES[currency.name.toLowerCase()]}
                        alt="icon"
                        width={40}
                        height={40}
                    />
                }
                title={currency.name + " price history"}>
            </CardHeader>
            <CardContent
                sx={{maxHeight: "500px", overflowY: "auto", padding:0, paddingTop:2, scrollbarColor: "#263238 rgb(17, 17, 17)"}}
            >
                <Box
                    className={"grid grid-cols-4 text-center items-center justify-center absolute w-full top-12"}
                    sx = {{backgroundColor:"rgb(17, 17, 17)"}}
                >
                    <Typography variant={"caption"} sx = {{color:"#FA7B78FF"}}>Close</Typography>
                    <Typography variant={"caption"} sx = {{color:"#75F1E5FF"}}>Open</Typography>
                    <Typography variant={"caption"} sx = {{color:"#f65151"}}>High</Typography>
                    <Typography variant={"caption"} sx = {{color:"#75c1f1"}}>Low</Typography>
                </Box>
                {data && data[currency.name].slice().reverse().slice(0,100).map((e) => {
                    return (
                        <Box key={e.time} className={"grid grid-cols-4 grid-rows-2 text-center items-center justify-center"}>
                            <Typography className = {"col-span-4"} variant={"caption"} sx = {{backgroundColor:"rgb(17, 17, 17)"}}>{e.time}</Typography>
                            <Typography variant={"caption"} sx = {{color:"#FA7B78FF"}}>{formatter.format(e.close)}</Typography>
                            <Typography variant={"caption"} sx = {{color:"#75F1E5FF"}}>{formatter.format(e.open)}</Typography>
                            <Typography variant={"caption"} sx = {{color:"#f65151"}}>{formatter.format(e.high)}</Typography>
                            <Typography variant={"caption"} sx = {{color:"#75c1f1"}}>{formatter.format(e.low)}</Typography>
                        </Box>
                    )
                })}
            </CardContent>
        </Card>
    );
};
