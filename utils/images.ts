import RIPPLERICO from "@/public/ripplerico.svg"
import BITCOINICO from "@/public/images/bitcoin.png"
import ETHERIUMICO from "@/public/images/etherium.png"
import LITECOINICO from "@/public/images/litecoin.png"
import {StaticImageData} from "next/image";

export const IMAGES: Record<string, StaticImageData | string> = {
    euro: "€",
    rippler: RIPPLERICO,
    innovate:ETHERIUMICO,
    kilowatt: LITECOINICO,
    ada: BITCOINICO,
};
