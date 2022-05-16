export const FETCH_SIGN_UP_USER_REQUEST = "FETCH_SIGN_UP_USER_REQUEST";
export const FETCH_SIGN_UP_USER_SUCCESS = "FETCH_SIGN_UP_USER_SUCCESS";
export const FETCH_SIGN_UP_USER_FAILURE = "FETCH_SIGN_UP_USER_FAILURE";

export const FETCH_LOG_IN_USER_REQUEST = "FETCH_LOG_IN_USER_REQUEST";
export const FETCH_LOG_IN_USER_SUCCESS = "FETCH_LOG_IN_USER_SUCCESS";
export const FETCH_LOG_IN_USER_FAILURE = "FETCH_LOG_IN_USER_FAILURE";

export const FETCH_GET_USERS_REQUEST = "FETCH_GET_USERS_REQUEST";
export const FETCH_GET_USERS_SUCCESS = "FETCH_GET_USERS_SUCCESS";

export interface IUser {
    id: string,
    login: string,
    name: string,
    tokens: ITokens
}

export interface IInvitedUser {
    id: string,
    login: string,
    name: string
}

export interface IUserState {
    user: IUser,
    loading: boolean,
    invitedUsers: IInvitedUser[]
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
    type: typeof FETCH_SIGN_UP_USER_FAILURE
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
    type: typeof FETCH_LOG_IN_USER_FAILURE
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

export type  UserActionTypes =
    | FetchSignUpUserRequestAction
    | FetchSignUpUserSuccessAction
    | FetchSignUpUserFailureAction
    | FetchLogInUserRequestAction
    | FetchLogInUserSuccessAction
    | FetchLogInUserFailureAction
    | FetchGetUsersRequestAction
    | FetchGetUsersSuccessAction;
