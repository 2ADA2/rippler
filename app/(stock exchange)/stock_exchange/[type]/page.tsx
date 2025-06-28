"use client"

import "./trader.scss"
import {Box, Container} from "@mui/system";
import Image from "next/image";
import RIPPLERIMG from "@/public/ripplerico.svg";
import React, {useState} from "react";
import {traderData} from "@/utils/testData";
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";

export default function Page() {
    const [data, setData] = useState(traderData);
    return (
        <>
            <section className={"trade-container"}>
                <Box className={"trade-header"}
                     sx={{display: "grid", alignItems: "center", gridTemplateColumns: " 60px repeat(5, 1fr)"}}>
                    <Image
                        src={RIPPLERIMG}
                        width={"50"}
                        height={"50"}
                        alt="Rippler logo"
                        className={"user-header-img"}
                    />
                    <div className={"header-block"}>
                        <span>{data.name}</span>
                        <span>{data.shortName}</span>
                    </div>
                    <div className={"header-block"}>
                        <span>Current price</span>
                        <span>{data.price} €</span>
                    </div>
                    <div className={"header-block"}>
                        <span>Max in 24h </span>
                        <span>{data.lastMax} €</span>
                    </div>
                    <div className={"header-block"}>
                        <span>Min in 24h</span>
                        <span>{data.lastMin} €</span>
                    </div>
                    <div className={"header-block"}>
                        <span>Sales volume</span>
                        <span>{data.salesVol} €</span>
                    </div>
                </Box>

                <Container className="chart-container">
                    chart
                </Container>

                <Container className={"history"}>
                <Box className={"purchases"}>purchases</Box>
                    <Box className={"sales"}>sales</Box>
                </Container>

                <Container className="orders">
                    orders
                </Container>

                <Container className={"finance-control"}>
                    <div className={"finance-control-header"}>header</div>
                    <Box className={"buy"}>
                        <h5>Buy {data.shortName}</h5>
                        <FormControl fullWidth sx={{ m: 1,}}>
                            <InputLabel htmlFor="outlined-adornment-amount">{"Buy "+ data.shortName}</InputLabel>
                            <OutlinedInput
                                sx={{paddingRight: "10px", height: "50px", borderColor:"white"}}
                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                label={"buy "+ data.shortName}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">{"Sell "+ data.shortName}</InputLabel>
                            <OutlinedInput
                                value={100}
                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                label={"sell "+ data.shortName}
                            />
                        </FormControl>
                    </Box>
                    <Box className={"sale"}>
                        <h5>sale {data.shortName}</h5>
                        <FormControl fullWidth sx={{m: 1}}>
                            <InputLabel htmlFor="outlined-adornment-amount">{"Sell " + data.shortName}</InputLabel>
                            <OutlinedInput
                                value={100}
                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                label={"sell " + data.shortName}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{m: 1}}>
                            <InputLabel htmlFor="outlined-adornment-amount">{"Sell " + data.shortName}</InputLabel>
                            <OutlinedInput
                                value={100}
                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                label={"sell " + data.shortName}
                            />
                        </FormControl>
                    </Box>
                </Container>
            </section>
            <Container>

            </Container>
        </>
    )
}