import { IAlert, SET_ALERT, SetAlertAction } from "./types";

export const setAlert = (alert: IAlert): SetAlertAction => {
    console.log(alert);
    return {
        type: SET_ALERT,
        payload: {
            alert: alert
        }
    }
}
