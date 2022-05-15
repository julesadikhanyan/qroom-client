import React from "react";
import { Box, CircularProgress } from "@mui/material";

import theme from "../../style/theme";

const Loading = () => {
    return (
        <Box sx={{
            width: 100,
            height: 100,
            position: "absolute",
            top: "50%",
            left: "50%",
            margin: "-50px 0 0 -50px"
        }}>
            <CircularProgress size={100} sx={{
                color: theme.palette.secondary.main
            }}/>
        </Box>
    )
}

export default Loading;
