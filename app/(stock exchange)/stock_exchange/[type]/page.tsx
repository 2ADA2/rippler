"use client"

import "./trader.scss"
import {Box, Container} from "@mui/system";
import Image, {StaticImageData} from "next/image";
import React, {useEffect, useState} from "react";
import {buyTheme, sellTheme} from "@/lib/theme/theme";
import {InputForm} from "@/components/forCharts/inputForm";
import {useParams} from "next/navigation";
import {IMAGES} from "@/utils/images";
import {Swiper, SwiperSlide} from "swiper/react";
import {sortWallet} from "@/functions/sortWallet";
import {NAMES} from "@/utils/names";
import {CurrencyInterface} from "@/lib/globalInterfaces";
import {Card, Typography} from "@mui/material";
import Link from "next/link"
import {useAppSelector} from "@/lib/hooks";
import {MainChart} from "@/components/charts/main";

export default function Page() {
    const {stockData, stockCurrentData} = useAppSelector(state => state.stockReducer)
    const {user} = useAppSelector(state => state.userReducer)
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
    const [userError, setUserError] = useState<string | null>();

    useEffect(() => {
        if(!user) return
        if(!user.wallet.wallet) return;
        const sorted = sortWallet(user.wallet.wallet, name);
        setWallet(sorted);
        setCurrent(sorted[1]);

        const capital = sorted.reduce((s, i) => {
            return s + (i.count * i.coefficient);
        }, 0);
        setCapital(capital.toLocaleString());
    }, [user]);

    useEffect(() => {
        if (stockCurrentData && stockData && user && current) {
            setPrice(stockCurrentData[current.name].close)
            const stockExchangeData = stockData[current.name]
            const lastDay = stockExchangeData.at(-2)
            if (lastDay) {
                setMinDay(lastDay.low)
                setMaxDay(lastDay.high)
            }
        }
    }, [stockCurrentData]);

    function buyCurrencyHandler(val: number) {
        setBuyCurrency(val)
        const amount = Number((val * price).toFixed(5))
        setBuyEuro(amount)
    }

    function buyEuroHandler(val: number) {
        setBuyEuro(val)
        const amount = Number((val / price).toFixed(5))
        setBuyCurrency(amount)
    }

    function sellCurrencyHandler(val: number) {
        setSellCurrency(val)
        const amount = Number((val * price).toFixed(5))
        setSellEuro(amount)
    }

    function sellEuroHandler(val: number) {
        setSellEuro(val)
        const amount = Number((val / price).toFixed(5))
        setSellCurrency(amount)
    }


    function approvePurchase() {
        if(!buyCurrency) return;
        setBuyEuro(0)
        setBuyCurrency(0)
    }

    function approveSell() {
        if(!sellCurrency) return;
        setSellCurrency(0)
        setSellEuro(0)
    }

    if(!current) return <></>

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
                        <span>{current.shortName}</span>
                        <span>{current.name}</span>
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
                        <span style={{color: "#d4e157"}}>1000 €</span>
                    </div>
                    <div className={"header-block items-center flex-col items-center flex justify-center"}
                         style={{background: "#263238", height: 60}}>
                        <span style={{color: "#cfd8dc"}}>1 {current.shortName}</span>
                        <span style={{
                            color: "#80cbc4",
                            fontWeight: 500
                        }}>{Number(price.toFixed(2)).toLocaleString()} €</span>
                    </div>
                </Box>

                <Container className="chart-container">
                    <MainChart/>
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
                                                    <Typography
                                                        textAlign={"start"}
                                                        sx={{width: "100%"}}
                                                    >
                                                        {e.count.toLocaleString()} {e.shortName}
                                                    </Typography>

                                                    <Typography textAlign={"start"} sx={{
                                                        width: "100%",
                                                        fontWeight: 100,
                                                        fontSize: 16
                                                    }}>
                                                        {(e.count * e.coefficient).toLocaleString()} €
                                                    </Typography>

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
                        <h5>Buy {current.shortName}</h5>
                        <InputForm
                            data={current}
                            theme={buyTheme}
                            currency="€"
                            value={buyEuro}
                            label={"Buy " + current.shortName + " for"}
                            change={(val: number) => buyEuroHandler(val)}
                        />
                        <InputForm
                            data={current}
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
                            label={"Buy " + current.shortName}
                            change={(val: number) => buyCurrencyHandler(val)}
                        />

                        <button className={"approve-btn"} onClick={() => approvePurchase()}>Approve purchase</button>
                    </Box>

                    <Box className={"sale"}>
                        <h5>Sale {current.shortName}</h5>
                        <InputForm
                            data={current}
                            theme={sellTheme}
                            currency="€"
                            value={sellEuro}
                            label={"Sell " + current.shortName + " for"}
                            change={(val: number) => sellEuroHandler(val)}
                        />
                        <InputForm
                            data={current}
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
                            label={"Sell " + current.shortName}
                            change={(val: number) => sellCurrencyHandler(val)}
                        />

                        <button className={"approve-btn"} onClick={() => approveSell()}>Approve sell</button>
                    </Box>

                </Container>
            </section>
        </>
    )
}