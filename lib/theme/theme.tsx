import { createTheme } from '@mui/material/styles';
import {cyan, pink} from '@mui/material/colors';

export const buyTheme = createTheme({
    palette: {
        primary: {
            main: cyan[300],
        },
        secondary: {
            main: '#f44336',
        },
    },
});
export const sellTheme = createTheme({
    palette: {
        primary: {
            main: pink[300],
        },
        secondary: {
            main: '#f44336',
        },
    },
});