"use client"
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/system";
import {CssBaseline} from "@mui/material";
import 'swiper/css';
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {getUserData} from "@/functions/getUserData";
import {getCookie} from "typescript-cookie";
import {GetUserDataInterface, StockHistoryInterface, StockInterface, StockOneInterface} from "@/lib/globalInterfaces";
import {setIsLoggedIn, setUserData} from "@/lib/features/user/UserSlice";
import {io} from "socket.io-client";
import {API_URL} from "@/utils/env";
import {getStockData} from "@/functions/getStockData";
import {updateStockData, updateStockHistoryData} from "@/lib/features/stock/stockSlice";
import {assign} from "next/dist/shared/lib/router/utils/querystring";
import {useAppSelector} from "@/lib/hooks";
import {Loading} from "@/components/loading";

const socket = io(API_URL);

const darkTheme = createTheme({
    typography: {
        fontFamily: 'var(--font-inter)', // или 'Inter, sans-serif'
    },
    palette: {
        mode: 'dark',
        background: {
            default: '#000000',
            paper: '#111111',
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#888',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#aaa',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#fff',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    border: '1px solid #555',
                },
            },
        },
    },
});

export function LayoutProvider({children}: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const {user} = useAppSelector(state => state.userReducer)
    const {stockData, stockCurrentData} = useAppSelector(state => state.stockReducer)

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const token = getCookie("token")
        if (token) {
            getUserData(token)
                .then((data: GetUserDataInterface) => {
                    dispatch(setUserData({userData: data}))
                }).then(() => {
                dispatch(setIsLoggedIn({isLoggedIn: true}));

            })
        }
        getStockData().then((data:StockHistoryInterface) => {
            dispatch(updateStockHistoryData({data}))
        })
    }, []);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected:', socket.id);
        });
        socket.on('disconnect', () => {
            console.log('Disconnected:', socket.id);
        });

        socket.on('updateData', (data:StockInterface) => {
            let formattedData = {...data}
            for (let i in data){
                let e:StockOneInterface = data[i]
                formattedData[i] = e
            }
            dispatch(updateStockData({data}))
        });
    }, []);

    useEffect(() => {
        if (user && stockData && stockCurrentData) {
            setIsLoaded(true);
        } else {
            setIsLoaded(false)
        }
    }, [user, stockData, stockCurrentData]);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            {isLoaded ? children : <Loading loadingStatus={"loading"}/>}
        </ThemeProvider>
    )
}