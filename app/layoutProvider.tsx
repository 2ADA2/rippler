"use client"
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/system";
import {CssBaseline} from "@mui/material";
import 'swiper/css';
import {useAppDispatch} from "@/lib/hooks";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getUserData} from "@/functions/getUserData";
import {getCookie} from "typescript-cookie";
import {GetUserDataInterface} from "@/lib/globalInterfaces";
import {setIsLoggedIn, setUserData} from "@/lib/features/user/UserSlice";

const darkTheme = createTheme({
    typography: {
        fontFamily: 'var(--font-inter)', // или 'Inter, sans-serif'
    },
    palette: {
        mode: 'dark',
        background: {
            default: '#000000', // ЧЁРНЫЙ ФОН ВСЕГО ТЕЛА
            paper: '#111111',   // ФОН КАРТОЧЕК И ДИАЛОГОВ
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#888', // или theme.palette.divider
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
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}