"use client"
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/system";
import {CssBaseline} from "@mui/material";
import 'swiper/css';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getUserData} from "@/functions/getUserData";
import {getCookie} from "typescript-cookie";
import {GetUserDataInterface, StockHistoryInterface, StockOneInterface} from "@/lib/globalInterfaces";
import {setIsLoggedIn, setUserData} from "@/lib/features/user/UserSlice";
import {io} from "socket.io-client";
import {API_URL} from "@/utils/env";
import {getStockData} from "@/functions/getStockData";
import {updateStockData, updateStockHistoryData} from "@/lib/features/stock/stockSlice";

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
            console.log('🟢 Connected:', socket.id);
        });

        socket.on('updateData', (data:StockOneInterface) => {
            dispatch(updateStockData({data}))
        });

        const interval = setInterval(() => {
            socket.emit("getData")
        },1000)

        return () => {
            socket.disconnect();
            clearInterval(interval)
        };
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}