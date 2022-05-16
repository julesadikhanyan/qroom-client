import {DELETE_ALERT, DeleteAlertAction, IAlert, SET_ALERT, SetAlertAction} from "./types";

export const setAlert = (alert: IAlert): SetAlertAction => {
    return {
        type: SET_ALERT,
        payload: {
            alert: alert
        }
    }
}

export const deleteAlert = (): DeleteAlertAction => {
    return {
        type: DELETE_ALERT
    }
}