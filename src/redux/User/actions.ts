import axios from "axios";
import {Dispatch} from "redux";

import {
    FETCH_SIGN_UP_USER_FAILURE,
    FETCH_SIGN_UP_USER_REQUEST,
    FETCH_SIGN_UP_USER_SUCCESS,
    FetchSignUpUserFailureAction,
    FetchSignUpUserRequestAction,
    FetchSignUpUserSuccessAction,
    IUser
} from "./types";

export const fetchSignUpUserRequest = (): FetchSignUpUserRequestAction => {
    return {
        type: FETCH_SIGN_UP_USER_REQUEST
    }
}

export const fetchSignUpUserSuccess = (user: IUser): FetchSignUpUserSuccessAction => {
    return {
        type: FETCH_SIGN_UP_USER_SUCCESS,
        payload: {
            user: user
        }
    }
}

export const fetchSignUpUserFailure = (): FetchSignUpUserFailureAction => {
    return {
        type: FETCH_SIGN_UP_USER_FAILURE
    }
}

export function fetchSignUpUser(name: string, login: string, password: string) {
    return function (dispatch: Dispatch<FetchSignUpUserRequestAction | FetchSignUpUserSuccessAction | FetchSignUpUserFailureAction>) {
        dispatch(fetchSignUpUserRequest());
        axios.post("https://qroom-server.herokuapp.com/users/register", {
            name: name,
            login: login,
            password: password
        })
            .then(response => {
                console.log(response.data);
                dispatch(fetchSignUpUserSuccess(response.data));
            })
            .catch(() => {
                dispatch(fetchSignUpUserFailure());
            });
    }
}
