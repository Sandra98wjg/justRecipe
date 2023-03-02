import { createTheme } from '@mui/material/styles';
import { green}  from '@mui/material/colors';

export const AppTheme = createTheme({

    palette: {
        primary: {
            main: green[500],
            contrastText: '#fff',
        },
        secondary: {
            main: "#55bc1e",
            contrastText: '#fff',
        },
        accent: {
            main: "#bc1e55",
        },
        background: {
            default: '#F5F5DC',
            paper: '#FFFFFF'
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,

    },

});
