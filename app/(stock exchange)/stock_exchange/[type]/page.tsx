"use client"

import "./trader.scss"
import {Box, Container} from "@mui/system";
import Image, {StaticImageData} from "next/image";
import React, {ChangeEvent, useEffect, useState} from "react";
import {buyTheme, sellTheme} from "@/lib/theme/theme";
import {InputForm} from "@/components/forCharts/inputForm";
import {useParams} from "next/navigation";
import {IMAGES} from "@/utils/images";
import {Swiper, SwiperSlide} from "swiper/react";
import {sortWallet} from "@/functions/sortWallet";
import {NAMES} from "@/utils/names";
import {CurrencyInterface, GetUserDataInterface, GetWalletInterface} from "@/lib/globalInterfaces";
import {Card, Slider, Typography} from "@mui/material";
import Link from "next/link"
import {useAppSelector} from "@/lib/hooks";
import {MainChart} from "@/components/charts/main";
import {skeletonWallet} from "@/utils/skeletonData";
import {createOperation} from "@/functions/createOperation";
import {getCookie} from "typescript-cookie";
import {PriceTable} from "@/components/forCharts/priceTable";
import {getUserData} from "@/functions/getUserData";
import {setUserData} from "@/lib/features/user/UserSlice";
import {useDispatch} from "react-redux";
import {formatter} from "@/utils/formatter";
import {PriceHistory} from "@/components/forCharts/priceHistory";

export default function Page() {
    const {stockData, stockCurrentData} = useAppSelector(state => state.stockReducer)
    const dispatch = useDispatch()
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
    const [buyPercents, setBuyPercents] = React.useState<number>(0);

    const [sellEuro, setSellEuro] = useState(0);
    const [sellCurrency, setSellCurrency] = useState(0);
    const [sellPercents, setSellPercents] = React.useState<number>(0);

    const [userError, setUserError] = useState<string | null>();
    const [isWalletLoading, setIsWalletLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            const sorted = sortWallet(skeletonWallet, name);
            setWallet(sorted);
            setCurrent(sorted[1]);
        } else {

            const sorted = sortWallet(user.wallet.wallet, name);
            setWallet(sorted);
            setCurrent(sorted[1]);
        }
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
            const capital = wallet.reduce((s, i) => {
                if (i.name === "Euro") return s + i.count;
                return s + (i.count * stockCurrentData[i.name].close);

            }, 0);
            setCapital(capital.toLocaleString());

        }

    }, [stockCurrentData]);

    function buyCurrencyHandler(val: number) {
        setUserError("")
        setBuyCurrency(val)
        const amount = Number((val * price).toFixed(5))
        setBuyEuro(amount)
        setBuyPercents(Math.floor(10000 * val*price/wallet[0].count)/100)
    }

    function buyEuroHandler(val: number, isConvertion = false) {
        setUserError("")
        setBuyEuro(val)
        const amount = Number((val / price).toFixed(5))
        setBuyCurrency(amount)
        if(!isConvertion){
            setBuyPercents(Math.floor(10000 * val/wallet[0].count)/100)
        }
    }

    function buySliderHandler(e: Event, newVal: number) {
        if(e.target){
            setBuyPercents(newVal)
            buyEuroHandler(Number((wallet[0].count * newVal/100).toFixed(5)), true)
        }
    }


    function sellCurrencyHandler(val: number, isConvertion = false) {
        setSellCurrency(val)
        setUserError("")
        const amount = Number((val * price).toFixed(5))
        setSellEuro(amount)
        if(!isConvertion){
            setSellPercents( Math.floor(10000 * val/wallet[1].count)/100)
        }

    }

    function sellEuroHandler(val: number) {
        setUserError("")
        setSellEuro(val)
        const amount = Number((val / price).toFixed(5))
        setSellCurrency(amount)
        setSellPercents( Math.floor(10000 * val / price/wallet[1].count)/100)
    }

    function sellSliderHandler(e: Event | null, newVal: number) {
        if(e){
            setSellPercents(newVal)
            sellCurrencyHandler(Number((wallet[1].count * newVal/100).toFixed(5)), true)
        }
    }


    function approvePurchase() {
        const token = getCookie("token")
        if (buyCurrency && user && current && token) {
            if (buyEuro > user.wallet.wallet[0].count) {
                setUserError("")
                setTimeout(() => {
                    setUserError("You don't have enough money.")
                })
                return
            }
            if (buyEuro < 1) {
                setUserError("")
                setTimeout(() => {
                    setUserError("your operations must be bigger than 1 EUR")
                })
                return
            }
            if (buyCurrency < 0.001) {
                setUserError("")
                setTimeout(() => {
                    setUserError("your operations must be bigger than 0.001 " + current.shortName)
                })
                return
            }
            setUserError("")
            setIsWalletLoading(true)
            createOperation(token, "buy", buyCurrency, current.name).then(() => {
                getUserData(token).then((data: GetUserDataInterface) => {
                    dispatch(setUserData({userData: data}))
                    setIsWalletLoading(false)
                })
            })
            setUserError("")
            setBuyEuro(0)
            setBuyCurrency(0)
        }
    }

    function approveSell() {
        const token = getCookie("token")
        if (sellCurrency && user && current && token) {
            if (sellCurrency > wallet[1].count) {
                setUserError("")
                setTimeout(() => {
                    setUserError("You don't have enough money.")
                })
                return
            }
            if (sellEuro < 1) {
                setUserError("")
                setTimeout(() => {
                    setUserError("your operations must be bigger than 1 EUR")
                })
                return
            }
            if (sellCurrency < 0.001) {
                setUserError("")
                setTimeout(() => {
                    setUserError("your operations must be bigger than 0.001 " + current.shortName)
                })
                return
            }
            setIsWalletLoading(true)
            createOperation(token, "sell", sellCurrency, current.name).then(() => {
                getUserData(token).then((data: GetUserDataInterface) => {
                    dispatch(setUserData({userData: data}))
                    setIsWalletLoading(false)
                })
            })
            setUserError("")
            setSellEuro(0)
            setSellCurrency(0)
        }
    }

    if (!current) return <></>

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
                    <div style={{width:"99%"}}>
                        <MainChart/>
                    </div>
                </Container>

                <Container className={"history flex flex-col gap-2 overflow-hidden"}>
                    <PriceTable/>
                    {current && <PriceHistory currency={current}/>}
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
                        {(wallet.length > 1 && !isWalletLoading) ? <Swiper slidesPerView={"auto"} spaceBetween={10}>
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
                                                        {e.name === "Euro" ? e.count : stockCurrentData && (stockCurrentData[e.name].close * wallet[i].count).toLocaleString()} €
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
                        </Swiper> :
                            <Card className={"p-10 flex gap-2 items-center height-full"} sx = {{background:"#263238", height:80}}>
                                <Image
                                    src={image}
                                    width={50}
                                    height={50}
                                    alt={"rippler logo"}
                                />
                                <Typography variant={"h6"}>Rippler updates your wallet</Typography>
                            </Card>
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
                        <Box sx={{ width: "100%", display:"grid", gridTemplateColumns:"3fr 1fr", textAlign: "center" }}>
                            <Slider
                                aria-label="Buy (%)"
                                defaultValue={0}
                                color="success"
                                step={0.1}
                                onChange={buySliderHandler}
                                value={buyPercents}
                            />
                            <Typography variant={"caption"}>{buyPercents} %</Typography>
                        </Box>

                        <button className={"approve-btn mt-2"} onClick={() => approvePurchase()}>Approve purchase</button>
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
                        <Box sx={{ width: "100%", display:"grid", gridTemplateColumns:"3fr 1fr", textAlign: "center" }}>
                            <Slider
                                aria-label="Sell (%)"
                                defaultValue={0}
                                value={sellPercents}
                                color="secondary"
                                step={0.1}
                                onChange={sellSliderHandler}
                            />
                            <Typography variant={"caption"}>{sellPercents} %</Typography>
                        </Box>

                        <button className={"approve-btn mt-2"} onClick={() => approveSell()}>Approve sell</button>
                    </Box>

                </Container>
            </section>
        </>
    )
}