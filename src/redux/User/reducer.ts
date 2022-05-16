import {
    CLEAN_ERROR,
    FETCH_GET_USERS_REQUEST, FETCH_GET_USERS_SUCCESS,
    FETCH_LOG_IN_USER_FAILURE,
    FETCH_LOG_IN_USER_REQUEST, FETCH_LOG_IN_USER_SUCCESS,
    FETCH_SIGN_UP_USER_FAILURE,
    FETCH_SIGN_UP_USER_REQUEST,
    FETCH_SIGN_UP_USER_SUCCESS,
    IUserState,
    UserActionTypes
} from "./types";

const initialState: IUserState = {
    user: {
        id: localStorage.getItem("id") || "",
        name: localStorage.getItem("name") || "",
        login: localStorage.getItem("login") || "",
        tokens: {
            authenticateToken: localStorage.getItem("authenticateToken") || "",
            refreshToken: localStorage.getItem("refreshToken") || ""
        }
    },
    loading: false,
    invitedUsers: [],
    error: null
}

export default (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case FETCH_SIGN_UP_USER_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_SIGN_UP_USER_SUCCESS: {
            return {
                ...state,
                user: action.payload.user,
                loading: false
            }
        }
        case FETCH_SIGN_UP_USER_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case FETCH_LOG_IN_USER_REQUEST: {
            return state;
        }
        case FETCH_LOG_IN_USER_SUCCESS: {
            return {
                ...state,
                user: action.payload.user
            }
        }
        case FETCH_LOG_IN_USER_FAILURE: {
            return state;
        }
        case FETCH_GET_USERS_REQUEST: {
            return state;
        }
        case FETCH_GET_USERS_SUCCESS: {
            return {
                ...state,
                invitedUsers: action.payload.invitedUsers
            }
        }
        case CLEAN_ERROR: {
            return {
                ...state,
                error: initialState.error
            }
        }
        default: return state;
    }
}
