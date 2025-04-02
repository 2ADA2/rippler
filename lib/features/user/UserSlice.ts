import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeCookie, setCookie} from "typescript-cookie";

export interface UserData {
    token: string
    isLoading: boolean
    loadingStatus: string
    error: string | null
    isLoggedIn: boolean

}

const initialState: UserData = {
    token: "",
    isLoading: false,
    loadingStatus: "",
    isLoggedIn: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken(state, action: { payload: { token: string | undefined } }) {
            if (action.payload.token) {
                state.token = action.payload.token;
            }

        },
        userFetching(state: UserData, action: { payload: { name: string } }) {
            state.isLoading = true;
            state.error = null;
            state.loadingStatus = action.payload.name;
        },
        userAuthSuccess(state: UserData, action) {
            state.error = null;
            state.isLoading = false;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            setCookie("token", state.token)
        },
        userFetchError(state: UserData, action) {
            state.error = action.payload.error;
            state.isLoading = false;
            state.token = ""
            state.isLoggedIn = false;
            removeCookie("token");
        },
        userLogout(state: UserData) {
            state.error = null;
            state.isLoading = false;
            state.token = ""
            removeCookie("token")
            state.isLoggedIn = false;
        }
    }
})

export default userSlice.reducer;