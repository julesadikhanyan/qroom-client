declare module "@mui/material/styles";

import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#65778B"
        },
        secondary: {
            main: "#F8BF4C"
        },
        warning: {
            main: "#c62828"
        },
        success: {
            main: "#4caf50"
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 375,
            md: 750,
            lg: 1000,
            xl: 1200,
        }
    }
});

export default theme;
