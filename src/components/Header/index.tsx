import React from "react";
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";

const Header: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography component="div" sx={{ flexGrow: 1 }}>QR</Typography>
                    <Stack spacing={2} direction="row">
                        <Button color="inherit">Sign up</Button>
                        <Button color="inherit">Log in</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;
