import {AppDispatch} from "@/lib/store";
import {userSlice} from "@/lib/features/user/UserSlice";
import axios from "axios";
import {API_URL} from "@/utils/env";

export const authorizeUser = async (dispatch: AppDispatch) => {
    try {
        const name = "authorization";
        const token = userSlice.getInitialState().token as string;
        await dispatch(userSlice.actions.userFetching({name}))
        const res = await axios.get(API_URL+"/ping")
        if(token){
            const fetching = await dispatch(userSlice.actions.userAuthSuccess({token}))
            return fetching.payload.token
        }
        throw new Error("cannot authenticate user");
    } catch (err) {
        console.log("error")
        //@ts-ignore
        dispatch(userSlice.actions.userFetchError(err.message))
        //@ts-ignore
        return err.message
    }
}

export const loginUser = async (dispatch: AppDispatch) => {
    try {
        const name = "login to session";
        await dispatch(userSlice.actions.userFetching({name}))
        const res = await axios.get(API_URL+"/ping")
        const data = {token:"23432"}
        if(data.token){
            const token = data.token;
            const fetching = await dispatch(userSlice.actions.userAuthSuccess({token}))
            return fetching.payload.token
        }
        throw new Error("cannot login");
    } catch (err) {
        console.log("error")
        //@ts-ignore
        dispatch(userSlice.actions.userFetchError(err.message))
        //@ts-ignore
        return err.message
    }
}
export const registerUser = async (dispatch: AppDispatch) => {
    try {
        const name = "creating an account";
        await dispatch(userSlice.actions.userFetching({name}))
        const res = await axios.get(API_URL+"/ping")
        if(res.data.token){
            const token = res.data.token;
            const fetching = await dispatch(userSlice.actions.userAuthSuccess({token}))
            return fetching.payload.token
        }
        throw new Error("registration failed");
    } catch (err) {
        console.log("error")
        //@ts-ignore
        dispatch(userSlice.actions.userFetchError(err.message))
        //@ts-ignore
        return err.message
    }
}