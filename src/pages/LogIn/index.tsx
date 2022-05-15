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
                                    rules={{
                                        required: "The email field must not be empty",
                                        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
                                    }}
                                    render={({ field, fieldState: { error } }) =>
                                        <TextField
                                            fullWidth
                                            {...field}
                                            error={!!error}
                                            helperText=
                                                { error && (error.type === "pattern") ?
                                                    "The email field must contains email. Example: name@gmail.com" :
                                                    error && (error.type === "required") ? error.message : null }
                                        />
                                    }
                                />
                            </FormStack>
                            <FormStack spacing={1}>
                                <Typography>Enter your password:</Typography>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "The password field must not be empty",
                                        pattern: /^[A-Za-z0-9_!@#$%^&*]{8,16}/i
                                    }}
                                    render={({ field, fieldState: { error } }) =>
                                        <TextField
                                            fullWidth
                                            {...field}
                                            error={!!error}
                                            helperText={ error && (error.type === "pattern") ?
                                                "The password field must be more 7 symbols and less 17 symbols. Use Latin letters, numbers and symbols: _!@#$%^&*" :
                                                error && (error.type === "required") ? error.message : null }
                                        />
                                    }
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
