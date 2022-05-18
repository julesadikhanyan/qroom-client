import axios from "axios";
import {Dispatch} from "redux";

import {saveDataInLocalStorage} from "../../helper/saveDataInLocalStorage";
import {historyHelper} from "../../helper/historyHelper";

import {
    CLEAN_ERROR,
    CLEAN_USER, CleanErrorAction,
    CleanUserAction, DELETE_ACTIVE_MEETING, DeleteActiveMeetingAction,
    FETCH_GET_HISTORY_FAILURE,
    FETCH_GET_HISTORY_REQUEST,
    FETCH_GET_HISTORY_SUCCESS,
    FETCH_GET_USERS_REQUEST,
    FETCH_GET_USERS_SUCCESS,
    FETCH_LOG_IN_USER_FAILURE,
    FETCH_LOG_IN_USER_REQUEST,
    FETCH_LOG_IN_USER_SUCCESS,
    FETCH_SIGN_UP_USER_FAILURE,
    FETCH_SIGN_UP_USER_REQUEST,
    FETCH_SIGN_UP_USER_SUCCESS,
    FetchGetHistoryFailureAction,
    FetchGetHistoryRequestAction,
    FetchGetHistorySuccessAction,
    FetchGetUsersRequestAction,
    FetchGetUsersSuccessAction,
    FetchLogInUserFailureAction,
    FetchLogInUserRequestAction,
    FetchLogInUserSuccessAction,
    FetchSignUpUserFailureAction,
    FetchSignUpUserRequestAction,
    FetchSignUpUserSuccessAction,
    ISystemUser,
    IUser, LOG_OUT_USER, LogOutUserAction, SET_ACTIVE_MEETING,
    SetActiveMeetingAction
} from "./types";
import {IBookingSegment, IError} from "../Room/types";

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

export const fetchLogInUserFailure = (error: IError): FetchLogInUserFailureAction => {
    return {
        type: FETCH_LOG_IN_USER_FAILURE,
        payload: {
            error: error
        }
    }
}

export const fetchGetUsersRequest = (): FetchGetUsersRequestAction => {
    return {
        type: FETCH_GET_USERS_REQUEST
    }
}

export const fetchGetUsersSuccess = (systemUsers: ISystemUser[]): FetchGetUsersSuccessAction => {
    return {
        type: FETCH_GET_USERS_SUCCESS,
        payload: {
            systemUsers: systemUsers
        }
    }
}

export const fetchGetHistoryRequest = (): FetchGetHistoryRequestAction => {
    return {
        type: FETCH_GET_HISTORY_REQUEST
    }
}

export const fetchGetHistorySuccess =
    (organizedMeetings: IBookingSegment[], invitations: IBookingSegment[], pastMeetings: IBookingSegment[]): FetchGetHistorySuccessAction => {
    return {
        type: FETCH_GET_HISTORY_SUCCESS,
        payload: {
            organizedMeetings: organizedMeetings,
            invitations: invitations,
            pastMeetings: pastMeetings
        }
    }
}

export const fetchGetHistoryFailure = (error: IError): FetchGetHistoryFailureAction => {
    return {
        type: FETCH_GET_HISTORY_FAILURE,
        payload: {
            error: error
        }
    }
}

export const cleanUser = (): CleanUserAction => {
    return {
        type: CLEAN_USER
    }
}

export const setActiveMeeting = (activeMeeting: IBookingSegment): SetActiveMeetingAction => {
    return {
       type: SET_ACTIVE_MEETING,
       payload: {
           activeMeeting: activeMeeting
       }
    }
}

export const deleteActiveMeeting = (): DeleteActiveMeetingAction => {
    return {
        type: DELETE_ACTIVE_MEETING
    }
}

export const logOutUser = (): LogOutUserAction => {
    localStorage.removeItem("name");
    localStorage.removeItem("login");
    localStorage.removeItem("authenticateToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("id");
    return {
        type: LOG_OUT_USER
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
        axios.post("https://69fa-5-167-210-139.ngrok.io/users/register", {
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
        axios.post("https://69fa-5-167-210-139.ngrok.io/users/authenticate", {
            login: login,
            password: password
        })
            .then(response => {
                saveDataInLocalStorage(response.data);
                dispatch(fetchLogInUserSuccess(response.data));
            })
            .catch((error) => {
                dispatch(fetchLogInUserFailure({ data: error.response.data, status: error.response.status }));
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
        authAxios.get("https://69fa-5-167-210-139.ngrok.io/users")
            .then(response => {
                dispatch(fetchGetUsersSuccess(response.data));
            })
    }
}

export function fetchGetHistory (token: string, id: string) {
    return function (dispatch: Dispatch<FetchGetHistoryRequestAction | FetchGetHistorySuccessAction | FetchGetHistoryFailureAction>) {
        const authAxios = axios.create({
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch(fetchGetHistoryRequest());
        authAxios.get("https://69fa-5-167-210-139.ngrok.io/users/history")
            .then(response => {
                const meetings = historyHelper(response.data, id);
                dispatch(fetchGetHistorySuccess(meetings.organizedMeetings, meetings.invitations, meetings.pastMeetings));
            })
            .catch((error) => {
                dispatch(fetchGetHistoryFailure({ data: error.response.data, status: error.response.status }));
            })
    }

}
