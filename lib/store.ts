import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from "./features/user/UserSlice"
import stockReducer from "./features/stock/stockSlice"

const rootReducers = combineReducers({
    userReducer,
    stockReducer
})

export const makeStore = () => {
    return configureStore({
        reducer: rootReducers,
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']