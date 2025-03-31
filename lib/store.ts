import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from "./features/user/UserSlice"

const rootReducers = combineReducers({
    userReducer
})

export const makeStore = () => {
    return configureStore({
        reducer: rootReducers,
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']