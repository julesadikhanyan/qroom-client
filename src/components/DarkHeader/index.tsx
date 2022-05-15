import React from "react";
import { AppBar, Box, Button, Toolbar, Typography, Stack, styled } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from "react-router-dom";

import theme from "../../style/theme";

const StyledButton = styled(Button)({
    border: "1px solid #FFFFFF"
});

const DarkHeader: React.FC = () => {
    const history = useHistory();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ padding: "0 20px 0 20px", height: "70px", boxShadow: "none" }}>
                <Toolbar>
                    <Stack
                        sx={{ flexGrow: 1, alignItems: "center"}}
                        spacing={3}
                        direction="row"
                    >
                        <Button
                            onClick={() => history.push("/rooms")}
                            sx={{
                                backgroundColor: "#FFFFFF",
                                color: theme.palette.primary.main,
                                height: 30,
                                "&:hover": {
                                    backgroundColor: "#FFFFFF"
                                }
                            }}
                        >
                            <ArrowBackIcon/>
                        </Button>
                        <Typography
                            component="div"
                            sx={{
                                fontSize: 36,
                                fontWeight: "bold",
                                color: "#FFFFFF"
                            }}
                        >
                            QR
                        </Typography>
                    </Stack>
                    <Stack
                        spacing={2}
                        direction="row"
                    >
                        <StyledButton
                            color="inherit"
                            onClick={() => history.push("/signup")}
                        >
                            Sign up
                        </StyledButton>
                        <StyledButton color="inherit">Log in</StyledButton>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default DarkHeader;
