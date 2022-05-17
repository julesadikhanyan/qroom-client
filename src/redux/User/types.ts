import {IBookingSegment, IError} from "../Room/types";

export const FETCH_SIGN_UP_USER_REQUEST = "FETCH_SIGN_UP_USER_REQUEST";
export const FETCH_SIGN_UP_USER_SUCCESS = "FETCH_SIGN_UP_USER_SUCCESS";
export const FETCH_SIGN_UP_USER_FAILURE = "FETCH_SIGN_UP_USER_FAILURE";

export const FETCH_LOG_IN_USER_REQUEST = "FETCH_LOG_IN_USER_REQUEST";
export const FETCH_LOG_IN_USER_SUCCESS = "FETCH_LOG_IN_USER_SUCCESS";
export const FETCH_LOG_IN_USER_FAILURE = "FETCH_LOG_IN_USER_FAILURE";

export const FETCH_GET_USERS_REQUEST = "FETCH_GET_USERS_REQUEST";
export const FETCH_GET_USERS_SUCCESS = "FETCH_GET_USERS_SUCCESS";

export const FETCH_GET_HISTORY_REQUEST = "FETCH_GET_HISTORY_REQUEST";
export const FETCH_GET_HISTORY_SUCCESS = "FETCH_GET_HISTORY_SUCCESS";
export const FETCH_GET_HISTORY_FAILURE = "FETCH_GET_HISTORY_FAILURE";

export const CLEAN_USER = "CLEAN_USER";

export const SET_ACTIVE_MEETING = "SET_ACTIVE_MEETING";
export const DELETE_ACTIVE_MEETING = "DELETE_ACTIVE_MEETING";

export const LOG_OUT_USER = "LOG_OUT_USER";

export interface IUser {
    id: string,
    login: string,
    name: string,
    tokens: ITokens
}

export interface IInvitedUser {
    id: string,
    login: string,
    name: string,
}

export interface IUserState {
    user: IUser,
    loading: boolean,
    invitedUsers: IInvitedUser[],
    error: IError | null,
    organizedMeetings: IBookingSegment[],
    invitations: IBookingSegment[],
    pastMeetings: IBookingSegment[],
    historyLoading: boolean,
    activeMeeting: IBookingSegment | null
}

export interface ITokens {
    authenticateToken: string,
    refreshToken: string
}

export interface FetchSignUpUserRequestAction {
    type: typeof FETCH_SIGN_UP_USER_REQUEST
}

export interface FetchSignUpUserSuccessAction {
    type: typeof FETCH_SIGN_UP_USER_SUCCESS,
    payload: {
        user: IUser
    }
}

export interface FetchSignUpUserFailureAction {
    type: typeof FETCH_SIGN_UP_USER_FAILURE,
    payload: {
        error: IError
    }
}

export interface FetchLogInUserRequestAction {
    type: typeof FETCH_LOG_IN_USER_REQUEST
}

export interface FetchLogInUserSuccessAction {
    type: typeof FETCH_LOG_IN_USER_SUCCESS,
    payload: {
        user: IUser
    }
}

export interface FetchLogInUserFailureAction {
    type: typeof FETCH_LOG_IN_USER_FAILURE,
    payload: {
        error: IError
    }
}

export interface FetchGetUsersRequestAction {
    type: typeof FETCH_GET_USERS_REQUEST
}

export interface FetchGetUsersSuccessAction {
    type: typeof FETCH_GET_USERS_SUCCESS,
    payload: {
        invitedUsers: IInvitedUser[]
    }
}

export interface FetchGetHistoryRequestAction {
    type: typeof FETCH_GET_HISTORY_REQUEST
}

export interface FetchGetHistorySuccessAction {
    type: typeof FETCH_GET_HISTORY_SUCCESS,
    payload: {
        organizedMeetings: IBookingSegment[],
        invitations: IBookingSegment[],
        pastMeetings: IBookingSegment[]
    }
}

export interface FetchGetHistoryFailureAction {
    type: typeof FETCH_GET_HISTORY_FAILURE,
    payload: {
        error: IError
    }
}

export interface SetActiveMeetingAction {
    type: typeof SET_ACTIVE_MEETING,
    payload: {
        activeMeeting: IBookingSegment
    }
}

export interface DeleteActiveMeetingAction {
    type: typeof DELETE_ACTIVE_MEETING
}


export interface CleanUserAction {
    type: typeof CLEAN_USER
}

export interface LogOutUserAction {
    type: typeof LOG_OUT_USER
}

export type  UserActionTypes =
    | FetchSignUpUserRequestAction
    | FetchSignUpUserSuccessAction
    | FetchSignUpUserFailureAction
    | FetchLogInUserRequestAction
    | FetchLogInUserSuccessAction
    | FetchLogInUserFailureAction
    | FetchGetUsersRequestAction
    | FetchGetUsersSuccessAction
    | FetchGetHistoryRequestAction
    | FetchGetHistorySuccessAction
    | FetchGetHistoryFailureAction
    | CleanUserAction
    | SetActiveMeetingAction
    | DeleteActiveMeetingAction
    | LogOutUserAction;
