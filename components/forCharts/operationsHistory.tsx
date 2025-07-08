"use client"
import {useEffect, useState} from "react";
import {useAppSelector} from "@/lib/hooks";
import {OperationInterface} from "@/lib/globalInterfaces";
import {Card, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {formatter} from "@/utils/formatter";

export interface FormattedPricesInterface {
    name: string,
    shortName: string,
    price: string,
    priceChange: string,
    percents: string,
    isUp: boolean | "-",
}

export function OperationsHistory() {
    const {operationsHistory} = useAppSelector(state => state.userReducer);
    const [formatted, setFormatted] = useState<OperationInterface[] | null>();
    useEffect(() => {
        if (operationsHistory) {
            let newHistory = [...operationsHistory.slice().reverse().slice(0, 10)]
            setFormatted(newHistory)
        }
    }, [operationsHistory]);
    return (
        <Card className={"flex flex-col gap-1 w-full priceTable mt-2 pt-15 relative"}>
            <CardHeader
                className={"absolute top-0 left-0 w-full"}
                sx = {{backdropFilter:"blur(10px)", backgroundColor:"rgb(17, 17, 17)"}}
                subheader={"Operations history"}>
            </CardHeader>
            <CardContent
                sx={{maxHeight: "500px", overflowY: "auto", padding:0, paddingTop:2, scrollbarColor: "#263238 rgb(17, 17, 17)"}}
            >
                <Box
                    className={"grid grid-cols-3 text-center items-center justify-center absolute w-full top-12"}
                    sx = {{backgroundColor:"rgb(17, 17, 17)"}}
                >
                    <Typography variant={"caption"} sx = {{color:"#FA7B78FF"}}>Name</Typography>
                    <Typography variant={"caption"} sx = {{color:"#75F1E5FF"}}>Amount</Typography>
                    <Typography variant={"caption"} sx = {{color:"#f65151"}}>Price</Typography>
                </Box>
                {formatted && formatted.map((e,i) => {
                    return (
                        <Box key={i} className={"grid grid-cols-3 grid-rows-2 text-center items-center justify-center"}>
                            <Typography className = {"col-span-4"} variant={"caption"} sx = {{backgroundColor:"rgb(17, 17, 17)"}}>{e.time}</Typography>
                            <Typography variant={"caption"} sx = {{color:"#FA7B78FF"}}>{e.currency}</Typography>
                            <Typography variant={"caption"} sx = {{color:"#75F1E5FF"}}>{e.currencyAmount.toFixed(2)}</Typography>
                            <Typography variant={"caption"} sx = {{color:"#f65151"}}>{formatter.format(e.currencyPrice)}</Typography>
                        </Box>
                    )
                })}
            </CardContent>
        </Card>
    );
};
