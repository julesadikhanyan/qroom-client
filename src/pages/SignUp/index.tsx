import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, {useEffect} from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import DarkHeader from "../../components/DarkHeader";
import theme from "../../style/theme";
import { fetchSignUpUser } from "../../redux/User/actions";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/User/types";
import Loading from "../../components/Loading";

export interface IFormInput {
    name: string,
    email: string,
    password: string
}

const SignUp: React.FC = () => {
    const dispatch = useDispatch();

    const user = useSelector<RootState, IUser | null>((state) => state.userReducer.user);
    const loading = useSelector<RootState, boolean>((state) => state.userReducer.loading);

    const { control, handleSubmit, reset } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = data => {
        dispatch(fetchSignUpUser(data.name, data.email, data.password));
    };

    useEffect(() => {
        reset({
            name: "",
            email: "",
            password: "",
        });
    }, [user]);

    if (loading) {
        return <Loading/>
    }

    return (
        <>
            <Box sx={{
                height: "100vh"
            }}>
                <DarkHeader name={user?.name}/>
                <Box sx={{
                    height: "calc(100vh - 70px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "500px"
                }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            minHeight: "450px"
                        }}>
                            <Typography sx={{
                                fontSize: 36,
                                fontWeight: "bold",
                                textAlign: "center"
                            }}>Get started with QROOM</Typography>
                            <Stack spacing={1} sx={{
                                width: "100%"
                            }}>
                                <Typography>Enter your name:</Typography>
                                <Controller
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field }) => <TextField fullWidth {...field} />}
                                />
                            </Stack>
                            <Stack spacing={1} sx={{
                                width: "100%"
                            }}>
                                <Typography>Enter your email:</Typography>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field }) => <TextField fullWidth {...field} />}
                                />
                            </Stack>
                            <Stack spacing={1} sx={{
                                width: "100%"
                            }}>
                                <Typography>Create your password:</Typography>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field }) => <TextField fullWidth {...field} />}
                                />
                            </Stack>
                            <Button
                                type="submit"
                                sx={{
                                    width: 200,
                                    height: 30,
                                    backgroundColor: theme.palette.secondary.main,
                                    color: "#FFFFFF",
                                    "&:hover": {
                                        backgroundColor: theme.palette.secondary.main
                                    }
                                }}
                            >
                                Sign up
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    )
}

export default SignUp;
