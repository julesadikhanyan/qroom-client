import React from "react";
import ReactDOM from "react-dom";
import {ThemeProvider} from "@mui/material";

import App from "./App";
import theme from "./style/theme";

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App/>
    </ThemeProvider>,
    document.getElementById("root"));