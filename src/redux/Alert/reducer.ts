import { AlertActionTypes, IAlertState, SET_ALERT } from "./types";

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
        default: return state;
    }
}
