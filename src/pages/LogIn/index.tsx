import { Box, TextField, Typography } from "@mui/material";
import React, {useEffect} from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import DarkHeader from "../../components/DarkHeader";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/User/types";
import Loading from "../../components/Loading";
import { ContentBox, FormBox, FormStack, SubmitButton, TitleTypography } from "../SignUp";
import { fetchLogInUser } from "../../redux/User/actions";

export interface IFormInput {
    email: string,
    password: string
}

const LogIn: React.FC = () => {
    const dispatch = useDispatch();

    const user = useSelector<RootState, IUser | null>((state) => state.userReducer.user);
    const loading = useSelector<RootState, boolean>((state) => state.userReducer.loading);

    const { control, handleSubmit, reset } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = data => {
        dispatch(fetchLogInUser(data.email, data.password))
    };

    useEffect(() => {
        reset({
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
                <ContentBox>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormBox sx={{ minHeight: "400px" }}>
                            <TitleTypography>Log in to your account</TitleTypography>
                            <FormStack spacing={1}>
                                <Typography>Enter your email:</Typography>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field }) => <TextField fullWidth {...field} />}
                                />
                            </FormStack>
                            <FormStack spacing={1}>
                                <Typography>Enter your password:</Typography>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field }) => <TextField fullWidth {...field} />}
                                />
                            </FormStack>
                            <SubmitButton type="submit">Log In</SubmitButton>
                        </FormBox>
                    </form>
                </ContentBox>
            </Box>
        </>
    )
}

export default LogIn;
