import {AppDispatch} from "@/lib/store";
import {userSlice} from "@/lib/features/user/UserSlice";

export const logoutUser = async (dispatch: AppDispatch) => {
    try{
        const name = "clothing the session";
        dispatch(userSlice.actions.userFetching({name}))
        setTimeout(() => {
            dispatch(userSlice.actions.userLogout())
        }, 2000)
    }catch(err){
        return err
    }
}