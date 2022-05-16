export const SET_ALERT = "SET_ALERT";
export const DELETE_ALERT = "DELETE_ALERT";

export interface IAlert {
    data: string,
    status: number
}

export interface IAlertState {
    alert: IAlert | null
}

export interface SetAlertAction {
    type: typeof SET_ALERT,
    payload: {
        alert: IAlert
    }
}

export interface DeleteAlertAction {
    type: typeof DELETE_ALERT
}

export type AlertActionTypes = SetAlertAction | DeleteAlertAction;
