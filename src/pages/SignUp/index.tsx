import {Box, Button, Stack, styled, TextField, Typography} from "@mui/material";
import React, {useEffect} from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import DarkHeader from "../../components/DarkHeader";
import theme from "../../style/theme";
import { fetchSignUpUser } from "../../redux/User/actions";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/User/types";
import Loading from "../../components/Loading";

export const ContentBox = styled(Box)({
    height: "calc(100vh - 70px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "500px"
});

export const FormBox = styled(Box)({
    width: "50vw",
    height: "50vh",
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "20px",
    padding: "20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: "500px",
    minHeight: "500px",
    [theme.breakpoints.down("md")]: {
        width: "90vw",
        padding: "10px",
        borderRadius: "10px"
    }
});

export const TitleTypography = styled(Typography)({
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
        fontSize: 24
    }
});

export const FormStack = styled(Stack)({
    width: "100%"
});

export const SubmitButton = styled(Button)({
    width: 200,
    height: 30,
    backgroundColor: theme.palette.secondary.main,
    color: "#FFFFFF",
    "&:hover": {
        backgroundColor: theme.palette.secondary.main
    }
});

export interface IFormInput {
    name: string,
    email: string,
    password: string
}

const SignUp: React.FC = () => {
    const dispatch = useDispatch();

    const user = useSelector<RootState, IUser>((state) => state.userReducer.user);
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
        <Box sx={{
            height: "100vh"
        }}>
            <DarkHeader name={user?.name}/>
            <ContentBox>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormBox>
                        <TitleTypography>Get started with QROOM</TitleTypography>
                        <FormStack spacing={1}>
                            <Typography>Enter your name:</Typography>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "The name field must not be empty",
                                    pattern: /^[a-zA-Z]+(?:[\s.-][a-zA-Z]+)*$/,
                                    minLength: 3,
                                    maxLength: 20
                                }}
                                render={({ field, fieldState: { error }  }) =>
                                    <TextField
                                        fullWidth
                                        {...field}
                                        error={!!error}
                                        helperText=
                                            { error && (error.type !== "required") ?
                                                "The name field must contain Latin letters. Minimum 3 symbols. Maximum 30 symbols" :
                                                error && (error.type === "required") ? error.message : null }
                                    />
                                }
                            />
                        </FormStack>
                        <Stack spacing={1} sx={{
                            width: "100%"
                        }}>
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
                        </Stack>
                        <Stack spacing={1} sx={{
                            width: "100%"
                        }}>
                            <Typography>Create your password:</Typography>
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
                        </Stack>
                        <SubmitButton type="submit">Sign up</SubmitButton>
                    </FormBox>
                </form>
            </ContentBox>
        </Box>
    )
}

export default SignUp;
