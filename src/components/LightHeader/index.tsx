import React from "react";
import { AppBar, Box, Button, Stack, Toolbar, Typography, styled } from "@mui/material";
import {useHistory, useLocation} from "react-router-dom";

import theme from "../../style/theme";
import MenuComponent from "../Menu";

const StyledButton = styled(Button)({
    border: `1px solid ${theme.palette.primary.main}`
});

export interface ILightHeaderProps {
    name: string | undefined,
    logOut: () => void
}

const LightHeader: React.FC<ILightHeaderProps>= (props) => {
    const { name, logOut } = props;

    const history = useHistory();
    const locations = useLocation();

    return (
        <Box sx={{ flexGrow: 1, marginBottom: "10px" }}>
            <AppBar sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
                color: theme.palette.primary.main,
                borderBottom: `1px solid ${theme.palette.primary.main}`
            }}>
                <Toolbar>
                    <Typography
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontSize: 36,
                            fontWeight: "bold"
                        }}
                    >
                        QR
                    </Typography>
                    {
                        name ?
                            <MenuComponent name={name} logOut={logOut}/> :
                                <Stack
                                    spacing={2}
                                    direction="row"
                                >
                                    <StyledButton
                                        disabled={locations.pathname === "/signup"}
                                        onClick={() => history.push("/signup")}
                                    >
                                        Sign up
                                    </StyledButton>
                                    <StyledButton
                                        disabled={locations.pathname === "/login"}
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

export default LightHeader;
