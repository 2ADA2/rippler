"use client"
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/system";
import {CssBaseline} from "@mui/material";
import 'swiper/css';

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

export function LayoutProvider({ children }: { children: React.ReactNode }) {

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}