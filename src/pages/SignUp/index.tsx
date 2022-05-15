import React from "react";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";

import DarkHeader from "../../components/DarkHeader";
import theme from "../../style/theme";

const SignUp: React.FC = () => {
    return (
        <Box sx={{
            height: "100vh"
        }}>
            <DarkHeader/>
            <Box sx={{
                height: "calc(100vh - 70px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "500px"
            }}>
                <Box sx={{
                    width: "50vw",
                    height: "60vh",
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: "20px",
                    padding: "20px",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    maxHeight: "500px",
                    minHeight: "350px"
                }}>
                    <Typography sx={{
                        fontSize: 36,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>Get started with QROOM</Typography>
                    <Stack spacing={1} sx={{
                        width: "100%"
                    }}>
                        <Typography>Enter your login:</Typography>
                        <TextField fullWidth/>
                    </Stack>
                    <Stack spacing={1} sx={{
                        width: "100%"
                    }}>
                        <Typography>Create your password:</Typography>
                        <TextField fullWidth/>
                    </Stack>
                    <Button sx={{
                        width: 200,
                        height: 30,
                        backgroundColor: theme.palette.secondary.main,
                        color: "#FFFFFF",
                        "&:hover": {
                            backgroundColor: theme.palette.secondary.main
                        }
                    }}>Sign up</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default SignUp;
