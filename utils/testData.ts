import {FPEInterface} from "@/components/forHome/fpElement";

const url = "data:image/png;base64,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"
export const popularPositions: FPEInterface[] = [
    {
        imgUrl: url,
        short:"BTC",
        name:"bitcoin",
        price:"$82478.82",
        activity:"-2.54%"
    }
]
export const recommendedPositions: FPEInterface[] = []