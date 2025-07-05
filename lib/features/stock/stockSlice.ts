import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeCookie, setCookie} from "typescript-cookie";
import {
    CurrencyInterface,
    GetUserDataInterface,
    StockHistoryInterface,
    StockInterface,
    StockOneInterface
} from "@/lib/globalInterfaces";

export interface UserData {
    stockData: null|StockHistoryInterface
    stockCurrentData: null|StockInterface
}

const initialState: UserData = {
    stockData: null,
    stockCurrentData: null
}

export const stockSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateStockHistoryData(state: UserData, action: { payload: { data:StockHistoryInterface } }) {
            state.stockData = action.payload.data;
        },
        updateStockData(state: UserData, action: { payload: { data:StockInterface } }) {
            const data = action.payload.data;
            if(state.stockCurrentData && state.stockData){
                if(data["Rippler"].time !== state.stockCurrentData["Rippler"].time){
                    const current = state.stockCurrentData
                    let newData:StockHistoryInterface = state.stockData;
                    for (let i in newData){
                        let currency = newData[i]
                        if(currency){
                            currency.push(current[i])
                            newData[i] = currency
                        }
                    }
                    state.stockData = newData
                }
            }
            state.stockCurrentData = data;

        }
    },
})
export const {updateStockData, updateStockHistoryData} = stockSlice.actions;
export default stockSlice.reducer;