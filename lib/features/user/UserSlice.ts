import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeCookie, setCookie} from "typescript-cookie";
import {GetUserDataInterface} from "@/lib/globalInterfaces";

export interface UserData {
    isLoading: boolean
    loadingStatus: string
    error: string | null
    isLoggedIn: boolean
    user:GetUserDataInterface| {}
}

const initialState: UserData = {
    isLoading: false,
    loadingStatus: "",
    isLoggedIn: false,
    error: null,
    user:{}
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
            state.user = action.payload.userData
        }
    }
})
export const {setIsLoggedIn, setUserData} = userSlice.actions;
export default userSlice.reducer;