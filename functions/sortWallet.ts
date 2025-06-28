import {CurrencyInterface} from "@/lib/globalInterfaces";


export function sortWallet(
    wallet: CurrencyInterface[],
    priority: string
): CurrencyInterface[] {
    let newWallet:CurrencyInterface[] = wallet.sort((a,b) => {
        if(a.name === "Euro"){
            return 1
        }else if(b.name === "Euro") {
            return -1
        }
        if(a.name === priority) {
            return 1
        } else if(b.name === priority){
            return -1
        }
        if(a.count > b.count) return 1
        return -1
    })
    return newWallet.reverse()
}
