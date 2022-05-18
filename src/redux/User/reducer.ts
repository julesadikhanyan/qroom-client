import {
    CLEAN_ERROR,
    CLEAN_USER,
    DELETE_ACTIVE_MEETING,
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
    IUserState,
    LOG_OUT_USER,
    SET_ACTIVE_MEETING,
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
    systemUsers: [],
    error: null,
    organizedMeetings: [],
    invitations: [],
    pastMeetings: [],
    historyLoading: true,
    activeMeeting: null
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
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_LOG_IN_USER_SUCCESS: {
            return {
                ...state,
                user: action.payload.user,
                loading: false
            }
        }
        case FETCH_LOG_IN_USER_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case FETCH_GET_USERS_REQUEST: {
            return state;
        }
        case FETCH_GET_USERS_SUCCESS: {
            return {
                ...state,
                systemUsers: action.payload.systemUsers
            }
        }
        case FETCH_GET_HISTORY_REQUEST: {
            return {
                ...state,
                historyLoading: true
            }
        }
        case FETCH_GET_HISTORY_SUCCESS: {
            return {
                ...state,
                organizedMeetings: action.payload.organizedMeetings,
                invitations: action.payload.invitations,
                pastMeetings: action.payload.pastMeetings,
                historyLoading: false
            }
        }
        case FETCH_GET_HISTORY_FAILURE: {
            return {
                ...state,
                error: action.payload.error,
                historyLoading: false
            }
        }
        case CLEAN_USER: {
            return {
                ...state,
                error: initialState.error,
                loading: initialState.loading
            }
        }
        case SET_ACTIVE_MEETING: {
            return {
                ...state,
                activeMeeting: action.payload.activeMeeting
            }
        }
        case DELETE_ACTIVE_MEETING: {
            return {
                ...state,
                activeMeeting: initialState.activeMeeting
            }
        }
        case LOG_OUT_USER: {
            return {
                ...state,
                user: {
                    id: "",
                    name: "",
                    login: "",
                    tokens: {
                        authenticateToken: "",
                        refreshToken: ""
                    }
                }
            }
        }
        case CLEAN_ERROR: {
            return {
                error: initialState.error
            }
        }
        default: return state;
    }
}
