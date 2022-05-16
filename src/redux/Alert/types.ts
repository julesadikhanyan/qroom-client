export const SET_ALERT = "SET_ALERT";

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

export type AlertActionTypes = SetAlertAction;
