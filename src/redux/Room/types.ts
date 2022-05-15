export const FETCH_GET_ROOM_REQUEST = "FETCH_GET_ROOM_REQUEST";
export const FETCH_GET_ROOM_SUCCESS = "FETCH_GET_ROOM_SUCCESS";

export interface IRoom {
    id: string,
    name: string,
    photoUrl: string,
    numberOfSeats: number,
    floor: number
}

export interface IRoomState {
    room: IRoom | null
}

export interface FetchGetRoomRequestAction {
    type: typeof FETCH_GET_ROOM_REQUEST
}

export interface FetchGetRoomSuccessAction {
    type: typeof FETCH_GET_ROOM_SUCCESS,
    payload: {
        room: IRoom
    }
}

export type RoomActionTypes =
    | FetchGetRoomRequestAction
    | FetchGetRoomSuccessAction;
