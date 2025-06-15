"use client"
import "./home.scss"
import Image from "next/image";
import NEXTIMG from "../public/nextico.svg"
import {FastPanel} from "@/components/forHome/fastPanel";
import {useAppSelector} from "@/lib/hooks";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGem, faOilWell, faPlay, faWheatAwn} from "@fortawesome/free-solid-svg-icons";
import {faBitcoin, faEthereum} from "@fortawesome/free-brands-svg-icons";
import {IStockSimulationData, stockSimulationData} from "@/utils/stockSimulationData";
import {SChart} from "@/components/charts/standard";

export default function Page() {
    const url = "data:image/jpeg;base64,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"

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [testDate, setTestDate] = useState("");
    const [stockSimNumber, setStockSimNumber] = useState(0);

    useEffect(() => {
        let date = new Date(2000, 0);
        const interval = setInterval(() => {
            date.setSeconds(date.getSeconds() + 60);
            setMinutes(date.getMinutes());
            setHours(date.getHours());
            setTestDate(date.toLocaleDateString() + " " + date.toLocaleTimeString())
        }, 100)
        return () => clearInterval(interval)
    }, []);

    useEffect(() => {
        const min = 0
        const max = 4
        let current = 0
        const interval = setInterval(() => {
            setStockSimNumber(current)
            current = current + 1
            console.log(current)
            if(current>4) current = 0
        },1000)
        return () => clearInterval(interval)
    }, []);

    const {isLoggedIn} = useAppSelector(state => state.userReducer);
    return (
        <section className={"home standard-template"}>
            <section className={"home-top flex space-between standard-container"}>
                <div className={"grid header-logo"}>
                    <Image
                        src={NEXTIMG}
                        width={"300"}
                        height={"350"}
                        alt="Rippler logo"
                        className={"row-span-2"}
                    />
                    <div className={"flex-col justify-center align-middle header-1"}>
                        <h1>Rippler</h1>
                        <h2>Trading simulator</h2>
                    </div>
                </div>
                <FastPanel/>
            </section>

            <section className={"abilities  standard-container"}>
                <h2>Rippler abilities</h2>
                <div className={"ab-list flex-col"}>
                    <div className={"ab-container"}>
                        <h3>Real-time simulator</h3>
                        <p>Don't forget close all orders before you leave.</p>
                        <div className={"ab-item"}>
                            <div className={"clock"} style={{rotate: "90deg"}}>
                                <div className={"minutes-arrow"} style={{
                                    rotate: 360 / 60 * minutes + "deg",
                                    transitionDuration: (minutes > 0 ? "150ms" : "0ms")
                                }}></div>
                                <div className={"hours-arrow"}
                                     style={{rotate: 360 / 12 * hours + 360 / 12 / 60 * minutes + "deg"}}></div>
                            </div>
                            <div>
                                {testDate}
                            </div>
                        </div>
                    </div>
                    <div className={"ab-container"}>
                        <h3>Large selection</h3>
                        <p>There are both stable and unstable assets here. It's easy to earn money with stable assets,
                            but you can earn more with unstable.</p>
                        <div className={"illustration"}>
                            <div className={"selection-images"}>
                                <FontAwesomeIcon icon={faGem}/>
                                <FontAwesomeIcon icon={faWheatAwn}/>
                                <FontAwesomeIcon icon={faOilWell}/>
                                <FontAwesomeIcon icon={faBitcoin}/>
                            </div>
                            <div>
                                <ul>
                                    <li>Agriculture</li>
                                    <li>Crypto</li>
                                    <li>Stock</li>
                                    <li>Resources</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={"ab-container"}>
                        <h3>Realistic simulation</h3>
                        <p>Like a real-life stock exchange. Realistic graphics movements, complex algorithms.</p>
                        <div className={"stock-simulation"}>
                            {stockSimulationData.map((e: IStockSimulationData) => {
                                return (<div className={"stock-row"} key={e.name}>
                                    <span>{e.name}</span>
                                    <span>${e.price[stockSimNumber]}</span>
                                    <span>${e.diffDollar[stockSimNumber]}</span>
                                    <span>{e.diffPercent[stockSimNumber]}%</span>
                                    <span className={e.grow[stockSimNumber] ? "isGrow" : ""}><FontAwesomeIcon
                                        icon={faPlay}/></span>
                                </div>)
                            })}
                        </div>
                    </div>
                    <div className={"ab-container"}>
                        <h3>Elements of the game</h3>
                        <p>It's more than a simulation it's also a stock exchange game.</p>
                        <div className={"illustration"}>item</div>
                    </div>
                </div>
            </section>

            <section className={"test-data  standard-container"}>
                <h2>Practice earning money</h2>
                <div className={"test-chart chart"}>
                    <SChart/>
                </div>
                <div className={"quotes"}></div>
            </section>

            <section className={"start  standard-container"}>
                <h2>Start practicing!</h2>
                {
                    (isLoggedIn) ?
                        <>
                            continue!
                        </>
                        :
                        <>
                            you can log in here!
                        </>
                }

            </section>

            <section className={"tutorial  standard-container"}>
                <h2>Tutorial</h2>
                <div className={"tutorial"}>

                </div>
                <div className={"quick-start"}></div>
            </section>

            <section className={"about  standard-container"}>
                <h2>Rippler by ADA</h2>
                <div className={"about"}>about</div>
            </section>

        </section>
    )
}
