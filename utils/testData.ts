import {FPEInterface} from "@/components/forHome/fpElement";
import ETH from "../public/images/etherium.png"
import BTC from "../public/images/bitcoin.png"
import LTC from "../public/images/litecoin.png"

export const popularPositions: FPEInterface[] = [
    {
        imgUrl: BTC,
        short:"BTC",
        name:"Bitcoin",
        price:"$82478.82",
        activity:"-2.54%"
    },
    {
        imgUrl: LTC,
        short:"LTC",
        name:"Litecoin",
        price:"$224.92",
        activity:"-2.59%"
    },
    {
        imgUrl: ETH,
        short:"ETH",
        name:"Ethereum",
        price:"$1459.40",
        activity:"6.12%"
    },
]
export const recommendedPositions: FPEInterface[] = []