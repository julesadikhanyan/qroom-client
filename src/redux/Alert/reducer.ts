import {AlertActionTypes, DELETE_ALERT, IAlertState, SET_ALERT} from "./types";

const initialState: IAlertState = {
    alert: null
}

export default (state = initialState, action: AlertActionTypes) => {
    switch (action.type) {
        case SET_ALERT: {
            return {
                ...state,
                alert: action.payload.alert
            }
        }
        case DELETE_ALERT: {
            return {
                alert: initialState.alert
            }
        }
        default: return state;
    }
}
