import React from "react";
import {AppBar, Box, Button, Toolbar, Typography, Stack, styled} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory, useLocation } from "react-router-dom";

import theme from "../../style/theme";
import MenuComponent from "../Menu";

export const StyledButton = styled(Button)({
    border: "1px solid #FFFFFF",
    "&:disabled": {
        border: "none"
    }
});

export interface IDarkHeaderProps {
    name: string | undefined,
    logOut: () => void
}

const DarkHeader: React.FC<IDarkHeaderProps>= (props) => {
    const { name, logOut } = props;

    const history = useHistory();
    const locations = useLocation();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    padding: "0 20px 0 20px",
                    height: 70,
                    boxSizing: "border-box",
                    boxShadow: "none",
                    [theme.breakpoints.down("md")]: {
                        padding: 0
                    },
                }}
            >
                <Toolbar>
                    <Stack
                        sx={{ flexGrow: 1, alignItems: "center" }}
                        spacing={3}
                        direction="row"
                    >
                        <Button
                            onClick={() => history.push("/rooms")}
                            sx={{
                                backgroundColor: "#FFFFFF",
                                color: theme.palette.primary.main,
                                height: 30,
                                [theme.breakpoints.down("md")]: {
                                    minWidth: 40
                                },
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
                    {
                        name ?
                            <MenuComponent name={name} logOut={logOut}/> :
                            <Stack
                                spacing={2}
                                direction="row"
                            >
                                <StyledButton
                                    disabled={locations.pathname === "/signup"}
                                    color="inherit"
                                    onClick={() => history.push("/signup")}
                                >
                                    Sign up
                                </StyledButton>
                                <StyledButton
                                    disabled={locations.pathname === "/login"}
                                    color="inherit"
                                    onClick={() => history.push("/login")}
                                >
                                    Log in
                                </StyledButton>
                            </Stack>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default DarkHeader;
