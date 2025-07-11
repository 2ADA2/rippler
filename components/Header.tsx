"use client"
import Link from "next/link";
import {useAppSelector} from "@/lib/hooks";
import Image from "next/image";
import RIPPLERIMG from "../public/ripplerico.svg"
import {useEffect, useState} from "react";
import {Loading} from "@/components/loading";
import {formatter} from "@/utils/formatter";


export const Header = () => {
    const {user} = useAppSelector(state => state.userReducer)
    const [euro, setEuro] = useState(0);
    const [rippler, setRippler] = useState(0);

    useEffect(() => {
        console.log(user)
        if(user){
            setEuro(user.wallet.wallet[0].count)
            setRippler(user.wallet.wallet[1].count)
        }
    }, [user]);

    return (
        <header className="flex justify-between items-center gap-3">
            <Link href={"/"} className={"rippler flex gap-2"}>
                <Image
                    src={RIPPLERIMG}
                    width={"50"}
                    height={"50"}
                    alt="Rippler logo"
                    className={"user-header-img"}
                />
                Rippler
            </Link>
            <nav>
                <Link href ={"/stock_exchange"}>Stock exchange</Link>
                <Link href = {"/trade"}>Trade</Link>
                <Link href = {"/finance"}>Finance</Link>
                <Link href = {"/markets"}>Markets</Link>
                <Link href = {"/about"}>About</Link>
            </nav>
            <div className={"grid grid-cols-2 grid-rows-3 user-header-info"}>
                {user && <>
                    <Link href={"/dashboard"}>{user.username}</Link>
                    <Link href={"/wallet"}>{formatter.format(euro)}</Link>
                    <Link href ={"/donate"}>{rippler} R</Link>
                    <a className={"user-header-img"}>
                        <Image
                            src={RIPPLERIMG}
                            width={"50"}
                            height={"50"}
                            alt="Rippler logo"
                            className={"user-header-img"}
                        />
                    </a>
                </>}
                {!user && <>
                    <Link href="/login">login</Link>
                    <Link href="/login">{euro} €</Link>
                    <Link href="/login">{rippler} R</Link>
                    <a className={"user-header-img"}>
                        <Image
                            src={RIPPLERIMG}
                            width={"50"}
                            height={"50"}
                            alt="Rippler logo"
                            className={"user-header-img"}
                        />
                    </a>
                </>}
            </div>
        </header>
    );
};
