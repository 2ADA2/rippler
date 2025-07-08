import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeCookie, setCookie} from "typescript-cookie";
import {CurrencyInterface, GetUserDataInterface} from "@/lib/globalInterfaces";

export interface UserData {
    isLoading: boolean
    loadingStatus: string
    error: string | null
    isLoggedIn: boolean
    user:GetUserDataInterface| null
}

const initialState: UserData = {
    isLoading: false,
    loadingStatus: "",
    isLoggedIn: false,
    error: null,
    user:null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userFetching(state: UserData, action: { payload: { name: string } }) {
            state.isLoading = true;
            state.error = null;
            state.loadingStatus = action.payload.name;
        },
        userLogout(state: UserData) {
            state.error = null;
            state.isLoading = false;
            removeCookie("token")
            state.isLoggedIn = false;
        },
        setIsLoggedIn(state:UserData, action: { payload: { isLoggedIn: boolean } }){
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setUserData(state:UserData, action: { payload: { userData: GetUserDataInterface } }) {
            let userdata:GetUserDataInterface = action.payload.userData
            let wallet:CurrencyInterface[] = userdata.wallet.wallet

            wallet.map(e => {
                e.count = Math.floor(e.count*1000000)/1000000
                return e
            })

            userdata.wallet.wallet = wallet
            state.user = userdata
        }
    }
})
export const {setIsLoggedIn, setUserData} = userSlice.actions;
export default userSlice.reducer;