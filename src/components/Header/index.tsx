import React from "react";
import { AppBar, Box, Button, Stack, styled, Toolbar, Typography } from "@mui/material";
import theme from "../../style/theme";

const StyledButton = styled(Button)({
    border: `1px solid ${theme.palette.primary.main}`
});

const Header: React.FC = () => {
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
                    <Stack spacing={2} direction="row">
                        <StyledButton color="inherit">Sign up</StyledButton>
                        <StyledButton color="inherit">Log in</StyledButton>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;
