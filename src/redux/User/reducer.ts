import {
    FETCH_SIGN_UP_USER_FAILURE,
    FETCH_SIGN_UP_USER_REQUEST,
    FETCH_SIGN_UP_USER_SUCCESS,
    IUserState,
    UserActionTypes
} from "./types";

const initialState: IUserState = {
    user: null,
    loading: false
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
                loading: false
            }
        }
        default: return state;
    }
}
