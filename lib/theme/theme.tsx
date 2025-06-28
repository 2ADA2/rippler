import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

export const mainTheme = createTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: '#f44336',
        },
    },
});