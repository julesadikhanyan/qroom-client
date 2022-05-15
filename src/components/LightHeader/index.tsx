import React from "react";
import { AppBar, Box, Button, Stack, Toolbar, Typography, styled } from "@mui/material";
import { useHistory } from "react-router-dom";

import theme from "../../style/theme";

const StyledButton = styled(Button)({
    border: `1px solid ${theme.palette.primary.main}`
});

export interface ILightHeaderProps {
    name: string | undefined
}

const LightHeader: React.FC<ILightHeaderProps>= (props) => {
    const { name } = props;

    const history = useHistory();

    return (
        <Box sx={{ flexGrow: 1 }}>
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
                            <StyledButton>{name}</StyledButton> :
                            <Stack spacing={2} direction="row">
                                <StyledButton onClick={() => history.push("/signup")}>Sign up</StyledButton>
                                <StyledButton onClick={() => history.push("/login")}>Log in</StyledButton>
                            </Stack>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default LightHeader;
