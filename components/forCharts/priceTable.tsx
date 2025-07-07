"use client"
import {Box} from "@mui/system";
import {StockOneInterface} from "@/lib/globalInterfaces";
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import {useEffect, useState} from "react";
import {useAppSelector} from "@/lib/hooks";
import {CURRENCYDATA} from "@/utils/names";
import {Card, Icon, Typography} from "@mui/material";
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

export function PriceTable() {
    const {stockCurrentData, stockData} = useAppSelector(state => state.stockReducer);
    const [formatted, setFormatted] = useState<FormattedPricesInterface[] | null>();

    useEffect(() => {
        if (stockCurrentData && stockData) {
            let newFormatted: FormattedPricesInterface[] = []

            for (let i in stockCurrentData) {
                if(newFormatted.length>5) {
                    break;
                }

                const current: StockOneInterface = stockCurrentData[i]
                const prevArray = stockData[i]
                const prev: StockOneInterface | undefined = prevArray?.at(-1)

                const currencyData: FormattedPricesInterface = {
                    name: i,
                    shortName: CURRENCYDATA[i].shortName,
                    price: formatter.format(current.close),
                    priceChange: prev ? formatter.format(current.close - prev.close) : "-",
                    percents: prev
                        ? (((current.close - prev.close) / prev.close) * 100).toFixed(2) + "%"
                        : "-",
                    isUp:prev ? current.close - prev.close > 0 : "-",
                }

                newFormatted.push(currencyData)
            }

            setFormatted(newFormatted)
        }
    }, [stockCurrentData, stockData])

    if (!formatted) {
        return <Box style={{width: '100%', height: '200px'}} className={"priceTable"}/>
    }

    return (
        <Card className={"flex flex-col gap-1 w-full priceTable mt-5"}>
            {formatted.map((e) => {
                return (
                    <Box key = {e.name} sx = {{gridTemplateColumns:"40px repeat(5, 1fr)"}} className={"p-1 grid items-center text-center g-1"}>
                        <Image
                            src ={IMAGES[e.name.toLowerCase()]}
                            alt = "icon"
                            width = {40}
                            height={40}
                        />
                        <Typography variant="caption">
                            {e.shortName}
                        </Typography>
                        <Typography variant="caption">
                            {e.price}
                        </Typography>
                        <Typography variant="caption">
                            {e.priceChange}
                        </Typography>
                        <Typography variant="caption">
                            {e.percents}
                        </Typography>

                        {(e.isUp === "-")

                            ? "-"

                            : (e.isUp)

                                ? <ArrowDropUpRoundedIcon sx={{color:"#75f1e5", fontSize:40}}/>

                                : <ArrowDropDownRoundedIcon sx={{color:"#fa7b78", fontSize:40}}/>
                        }
                    </Box>
                )
            })}
        </Card>
    );
};
