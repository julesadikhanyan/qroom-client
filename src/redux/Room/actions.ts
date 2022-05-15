import { Dispatch } from "redux";
import axios from "axios";

import {
    FETCH_GET_ROOM_REQUEST,
    FETCH_GET_ROOM_SUCCESS,
    FetchGetRoomRequestAction,
    FetchGetRoomSuccessAction,
    IRoom
} from "./types";

export const fetchGetRoomRequest = (): FetchGetRoomRequestAction => {
    return {
        type: FETCH_GET_ROOM_REQUEST
    }
}

export const fetchGetRoomSuccess = (room: IRoom): FetchGetRoomSuccessAction => {
    return {
        type: FETCH_GET_ROOM_SUCCESS,
        payload: {
            room: room
        }
    }
}

export function fetchGetRoom(id: string) {
    return function (dispatch: Dispatch<FetchGetRoomRequestAction | FetchGetRoomSuccessAction>){
        dispatch(fetchGetRoomRequest());
        axios.get(`https://qroom-server.herokuapp.com/rooms/${id}`)
            .then(response => {
                dispatch(fetchGetRoomSuccess(response.data));
            });
    }
}
