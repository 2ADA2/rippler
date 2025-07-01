"use client"

import "./trader.scss"
import {Box, Container, flex} from "@mui/system";
import Image, {StaticImageData} from "next/image";
import React, {useEffect, useMemo, useState} from "react";
import {testWallet, traderData} from "@/utils/testData";
import {buyTheme, sellTheme} from "@/lib/theme/theme";
import {InputForm} from "@/components/forCharts/inputForm";
import {useParams} from "next/navigation";
import {IMAGES} from "@/utils/images";
import {Swiper, SwiperSlide} from "swiper/react";
import {sortWallet} from "@/functions/sortWallet";
import {NAMES} from "@/utils/names";
import {CurrencyInterface, StockHistoryInterface, StockInterface, StockOneInterface} from "@/lib/globalInterfaces";
import {Button, Card, Typography} from "@mui/material";
import Link from "next/link"
import {useAppSelector} from "@/lib/hooks";
import {SChart} from "@/components/charts/standard";
import {MainChart} from "@/components/charts/main";

export default function Page() {
    const {stockData, stockCurrentData} = useAppSelector(state => state.stockReducer)
    const {user} = useAppSelector(state => state.userReducer)

    const [formattedData, setFormattedData] = useState<StockOneInterface[] | []>([]);
    const [data, setData] = useState(traderData);
    const params: { type: string } = useParams()
    const image: StaticImageData | string = IMAGES[params.type];
    const name: string = NAMES[params.type];
    const [wallet, setWallet] = useState<CurrencyInterface[] | []>([]);
    const [capital, setCapital] = useState("0");

    const [current, setCurrent] = useState<CurrencyInterface>();

    const [price, setPrice] = useState(0);
    const [minDay, setMinDay] = useState(0);
    const [maxDay, setMaxDay] = useState(0);


    const [buyEuro, setBuyEuro] = useState(0);
    const [buyCurrency, setBuyCurrency] = useState(0);

    const [sellEuro, setSellEuro] = useState(0);
    const [sellCurrency, setSellCurrency] = useState(0);

    const [date, setDate] = useState<string>("");
    const [operation, setOperation] = useState<"purchase"|"sell"|null>(null);
    const [currencyAmount, setCurrencyAmount] = useState(0);
    const [euroAmount, setEuroAmount] = useState(0);

    const [userError, setUserError] = useState<string|null>();

    useEffect(() => {
        const sorted = sortWallet(testWallet, name);
        setWallet(sorted);
        setCurrent(sorted[1]);

        const capital = sorted.reduce((s, i) => {
            return s + (i.count * i.coefficient);
        }, 0);
        setCapital(capital.toLocaleString());
    }, []);

    useEffect(() => {
        if(data.name in stockData){
            let formatted = (stockCurrentData as StockInterface)[data.name]
            formatted = {...formatted, time: formatted.time.split(".").reverse().join("-")}

            const stockExchangeData = (stockData as StockHistoryInterface)[data.name]
            const lastDay = stockExchangeData.at(-2)

            setPrice(formatted.close)
            if(lastDay){
                setMinDay(lastDay.low)
                setMaxDay(lastDay.high)
            }
        }
    }, [stockCurrentData]);

    useEffect(() => {
        if(data.name in stockData){
            const stockExchangeData = (stockData as StockHistoryInterface)[data.name]
            const formatted = stockExchangeData.map(e => {
                e = {...e, time: e.time.split(".").reverse().join("-")}
                return e
            })
            setFormattedData(formatted)
        }
    }, [stockData]);

    function buyCurrencyHandler(val: number) {
        setBuyCurrency(val)
        setBuyEuro(val * current!.coefficient)
    }

    function buyEuroHandler(val: number) {
        setBuyEuro(val)
        setBuyCurrency(val / current!.coefficient)
    }

    function sellCurrencyHandler(val: number) {
        setSellCurrency(val)
        setSellEuro(val * current!.coefficient)
    }

    function sellEuroHandler(val: number) {
        setSellEuro(val)
        setSellCurrency(val / current!.coefficient)
    }


    function approvePurchase(){
        if(buyEuro >= 0.01 && buyCurrency >= 0.01){
            setOperation("purchase")
            setEuroAmount(buyEuro)
            setCurrencyAmount(buyCurrency)
            setDate(new Date().toLocaleDateString())
            setUserError("")
            window.scrollBy(0,1000)
        } else{
            setUserError("")
            setTimeout(() => {
                setUserError("the transaction must include more than 0.01 euro and currency")
            })
        }
    }

    function approveSell(){
        if(sellEuro >= 0.01 && sellCurrency >= 0.01){
            setOperation("sell")
            setEuroAmount(buyEuro)
            setCurrencyAmount(buyCurrency)
            setDate(new Date().toLocaleDateString())
            setUserError("")
        }  else{
            setUserError("")
            setTimeout(() => {
                setUserError("the transaction must include more than 0.01 euro and currency")
            })
        }
    }

    return (
        <>
            <section className={"trade-container"}>
                <Box className={"trade-header"}
                     sx={{display: "grid", alignItems: "center", gridTemplateColumns: " 60px repeat(6, 1fr)"}}>
                    <Image
                        src={image}
                        width={"50"}
                        height={"50"}
                        alt="Rippler logo"
                        className={"user-header-img"}
                    />
                    <div className={"header-block"}>
                        <span>{data.shortName}</span>
                        <span>{data.name}</span>
                    </div>
                    <div className={"header-block"}>
                        <span>Current price</span>
                        <span style={{color: "#b9f6ca"}}>{Number(price.toFixed(2)).toLocaleString()} €</span>
                    </div>
                    <div className={"header-block"}>
                        <span>Max in 24h </span>
                        <span style={{color: "#f50057"}}>{Number(maxDay.toFixed(2)).toLocaleString()} €</span>
                    </div>
                    <div className={"header-block"}>
                        <span>Min in 24h</span>
                        <span style={{color: "#81d4fa"}}>{Number(minDay.toFixed(2)).toLocaleString()} €</span>
                    </div>
                    <div className={"header-block"}>
                        <span>Sales volume</span>
                        <span style={{color: "#d4e157"}}>{data.salesVol.toLocaleString()} €</span>
                    </div>
                    <div className={"header-block items-center flex-col items-center flex justify-center"} style={{background: "#263238", height:60}}>
                        <span style={{color: "#cfd8dc"}}>1 {data.shortName}</span>
                        <span style={{color: "#80cbc4", fontWeight: 500}}>{Number(price.toFixed(2)).toLocaleString()} €</span>
                    </div>
                </Box>

                <Container className="chart-container">
                    <MainChart data={formattedData}/>
                </Container>

                <Container className={"history"}>
                    <Box className={"purchases"}>purchases</Box>
                    <Box className={"sales"}>sales</Box>
                </Container>

                <Container className="orders">
                    orders
                </Container>

                <Container className={"finance-control"}>
                    <div className={"finance-control-header mt-2"}>
                        <div className={"pb-4 flex items-center gap-2 "}>
                            <Link href={"/finance"}>Your wallet</Link>
                            <span style={{fontSize: 16, fontWeight: 100}}>All capital <span
                                style={{color: "#b9f6ca"}}>{capital} €</span></span>
                        </div>
                        {(wallet.length > 1) && <Swiper slidesPerView={"auto"} spaceBetween={10}>
                            {
                                wallet.map((e, i) => {
                                    return (
                                        <SwiperSlide style={{width: "auto"}}>
                                            <Card sx={{
                                                display: "flex",
                                                p: 2,
                                                backgroundColor: (i <= 1) ? "#263238" : ""
                                            }}>
                                                <Box sx={{width: "50px", mr: 1}}>
                                                    {Object.keys(IMAGES)[e.code] === "euro" ?
                                                        <div style={{fontSize: 36, textAlign: "center",}}>€</div>
                                                        : <Image
                                                            src={IMAGES[Object.keys(IMAGES)[e.code]]}
                                                            alt={"image"}
                                                            width={50}
                                                            height={50}
                                                            className={"rounded-xl"}
                                                        />
                                                    }
                                                </Box>
                                                <Box sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",

                                                }}>
                                                    <Typography textAlign={"start"}
                                                                sx={{width: "100%"}}>{e.count.toLocaleString()} {e.shortName}</Typography>
                                                    <Typography textAlign={"start"} sx={{
                                                        width: "100%",
                                                        fontWeight: 100,
                                                        fontSize: 16
                                                    }}>{(e.count * e.coefficient).toLocaleString()} €</Typography>
                                                </Box>
                                            </Card>
                                        </SwiperSlide>
                                    )
                                })
                            }
                            {
                                !wallet.length && <Card sx={{width: 150, height: 50, p: 2}}></Card>
                            }
                        </Swiper>
                        }
                        {userError && <Box className={"user-error"}>{userError}</Box>}
                    </div>
                    <Box className={"buy"}>
                        <h5>Buy {data.shortName}</h5>
                        <InputForm
                            data={data}
                            theme={buyTheme}
                            currency="€"
                            value={buyEuro}
                            label={"Buy " + data.shortName + " for"}
                            change={(val: number) => buyEuroHandler(val)}
                        />
                        <InputForm
                            data={data}
                            theme={buyTheme}
                            currency={
                                <Image
                                    src={image}
                                    width={30}
                                    height={30}
                                    alt={"rippler logo"}
                                />
                            }
                            value={buyCurrency}
                            label={"Buy " + data.shortName}
                            change={(val: number) => buyCurrencyHandler(val)}
                        />

                        <button className={"approve-btn"} onClick={() => approvePurchase()}>Approve purchase</button>
                    </Box>

                    <Box className={"sale"}>
                        <h5>Sale {data.shortName}</h5>
                        <InputForm
                            data={data}
                            theme={sellTheme}
                            currency="€"
                            value={sellEuro}
                            label={"Sell " + data.shortName + " for"}
                            change={(val: number) => sellEuroHandler(val)}
                        />
                        <InputForm
                            data={data}
                            theme={sellTheme}
                            currency={
                                <Image
                                    src={image}
                                    width={30}
                                    height={30}
                                    alt={"rippler logo"}
                                />
                            }
                            value={sellCurrency}
                            label={"Sell " + data.shortName}
                            change={(val: number) => sellCurrencyHandler(val)}
                        />

                        <button className={"approve-btn"} onClick={() => approveSell()}>Approve sell</button>
                    </Box>

                </Container>
                <Container className = {"operation-confirmation rounded-xl mt-4"}>
                    <h5>Confirmation of operation</h5>
                    <Box className={"confirmation-block"}>
                        <span>Operation</span>
                        <span>{operation || "no operation"}</span>
                    </Box>
                    <Box className={"confirmation-block"}>
                        <span>Amount of {data.shortName} ( {data.name} )</span>
                        <span style={{color: operation ? "#b9f6ca" : "white"}}>{currencyAmount || "no operation"}</span>
                    </Box>
                    <Box className={"confirmation-block"}>
                        <span>Amount of EUR ( Euro )</span>
                        <span style={{color: operation ? "#b9f6ca" : "white"}}>{euroAmount || "no operation"}</span>
                    </Box>
                    <Box className={"confirmation-block"}>
                        <span>Current date</span>
                        <span>{date.toLocaleString() || "no operation"}</span>
                    </Box>
                    {(data && operation) &&
                        <button className={"approve-btn"} style={{width: 300,margin:"20px auto 0 auto"}}>Approve the operation </button>
                    }
                </Container>
            </section>
        </>
    )
}