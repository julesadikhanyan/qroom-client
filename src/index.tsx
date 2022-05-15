import React from "react";
import ReactDOM from "react-dom";
import {ThemeProvider} from "@mui/material";
import { Provider } from "react-redux";

import App from "./App";
import theme from "./style/theme";
import store from "./redux/store";

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </Provider>,
    document.getElementById("root"));