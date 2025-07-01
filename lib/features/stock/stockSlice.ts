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
    stockData: {}|StockHistoryInterface
    stockCurrentData: {}|StockOneInterface
}

const initialState: UserData = {
    stockData: {},
    stockCurrentData: {}
}

export const stockSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateStockHistoryData(state: UserData, action: { payload: { data:StockHistoryInterface } }) {
            state.stockData = action.payload.data;
        },
        updateStockData(state: UserData, action: { payload: { data:StockOneInterface } }) {
            state.stockCurrentData = action.payload.data;
        }
    }
})
export const {updateStockData, updateStockHistoryData} = stockSlice.actions;
export default stockSlice.reducer;