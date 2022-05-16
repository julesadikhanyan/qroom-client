import axios from "axios";
import {Dispatch} from "redux";

import {saveDataInLocalStorage} from "../../helper/saveDataInLocalStorage";
import {
    CLEAN_ERROR,
    CleanErrorAction,
    FETCH_GET_USERS_REQUEST,
    FETCH_GET_USERS_SUCCESS,
    FETCH_LOG_IN_USER_FAILURE, FETCH_LOG_IN_USER_REQUEST, FETCH_LOG_IN_USER_SUCCESS,
    FETCH_SIGN_UP_USER_FAILURE,
    FETCH_SIGN_UP_USER_REQUEST,
    FETCH_SIGN_UP_USER_SUCCESS,
    FetchGetUsersRequestAction,
    FetchGetUsersSuccessAction,
    FetchLogInUserFailureAction, FetchLogInUserRequestAction,
    FetchLogInUserSuccessAction,
    FetchSignUpUserFailureAction,
    FetchSignUpUserRequestAction,
    FetchSignUpUserSuccessAction,
    IInvitedUser,
    IUser
} from "./types";
import {IError} from "../Room/types";

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

export const fetchSignUpUserFailure = (error: IError): FetchSignUpUserFailureAction => {
    return {
        type: FETCH_SIGN_UP_USER_FAILURE,
        payload: {
            error: error
        }
    }
}

export const fetchLogInUserRequest = (): FetchLogInUserRequestAction => {
    return {
        type: FETCH_LOG_IN_USER_REQUEST
    }
}

export const fetchLogInUserSuccess = (user: IUser): FetchLogInUserSuccessAction => {
    return {
        type: FETCH_LOG_IN_USER_SUCCESS,
        payload: {
            user: user
        }
    }
}

export const fetchLogInUserFailure = (): FetchLogInUserFailureAction => {
    return {
        type: FETCH_LOG_IN_USER_FAILURE
    }
}

export const fetchGetUsersRequest = (): FetchGetUsersRequestAction => {
    return {
        type: FETCH_GET_USERS_REQUEST
    }
}

export const fetchGetUsersSuccess = (invitedUsers: IInvitedUser[]): FetchGetUsersSuccessAction => {
    return {
        type: FETCH_GET_USERS_SUCCESS,
        payload: {
            invitedUsers: invitedUsers
        }
    }
}

export const cleanError = (): CleanErrorAction => {
    return {
        type: CLEAN_ERROR
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
                saveDataInLocalStorage(response.data);
                dispatch(fetchSignUpUserSuccess(response.data));
            })
            .catch(error => {
            dispatch(fetchSignUpUserFailure({ data: error.response.data, status: error.response.status }));
        })
    }
}

export function fetchLogInUser(login: string, password: string) {
    return function (dispatch: Dispatch<FetchLogInUserRequestAction | FetchLogInUserSuccessAction | FetchLogInUserFailureAction>) {
        dispatch(fetchLogInUserRequest());
        axios.post("https://qroom-server.herokuapp.com/users/authenticate", {
            login: login,
            password: password
        })
            .then(response => {
                saveDataInLocalStorage(response.data);
                dispatch(fetchLogInUserSuccess(response.data));
            })
            .catch(() => {
                dispatch(fetchLogInUserFailure());
            })
    }
}

export function fetchGetUsers(token: string) {
    const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return function (dispatch: Dispatch<FetchGetUsersRequestAction | FetchGetUsersSuccessAction>) {
        dispatch(fetchGetUsersRequest());
        authAxios.get("https://qroom-server.herokuapp.com/users")
            .then(response => {
                dispatch(fetchGetUsersSuccess(response.data));
            })
    }
}
