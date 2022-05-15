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

export const fetchLogInUserRequest = (): FetchSignUpUserRequestAction => {
    return {
        type: FETCH_SIGN_UP_USER_REQUEST
    }
}

export const fetchLogInUserSuccess = (user: IUser): FetchSignUpUserSuccessAction => {
    return {
        type: FETCH_SIGN_UP_USER_SUCCESS,
        payload: {
            user: user
        }
    }
}

export const fetchLogInUserFailure = (): FetchSignUpUserFailureAction => {
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
                dispatch(fetchSignUpUserSuccess(response.data));
            })
            .catch(() => {
                dispatch(fetchSignUpUserFailure());
            });
    }
}

export function fetchLogInUser(login: string, password: string) {
    return function (dispatch: Dispatch<FetchSignUpUserRequestAction | FetchSignUpUserSuccessAction | FetchSignUpUserFailureAction>) {
        dispatch(fetchLogInUserRequest());
        axios.post("https://qroom-server.herokuapp.com/users/authenticate", {
            login: login,
            password: password
        })
            .then(response => {
                dispatch(fetchLogInUserSuccess(response.data));
            })
            .catch(() => {
                dispatch(fetchLogInUserFailure());
            })
    }
}
