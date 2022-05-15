import React from "react";
import { AppBar, Box, Button, Toolbar, Typography, Stack } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DarkHeader: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Stack
                        sx={{ flexGrow: 1}}
                        spacing={2}
                        direction="row"
                    >
                        <Button color="inherit">
                            <ArrowBackIcon/>
                        </Button>
                        <Typography component="div">QR</Typography>
                    </Stack>
                    <Stack
                        spacing={2}
                        direction="row"
                    >
                        <Button color="inherit">Sign up</Button>
                        <Button color="inherit">Log in</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default DarkHeader;
