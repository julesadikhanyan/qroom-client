import {Dispatch} from "redux";
import axios from "axios";

import {
    FETCH_GET_BOOKING_ROOM_REQUEST, FETCH_GET_BOOKING_ROOM_SUCCESS,
    FETCH_GET_ROOM_REQUEST,
    FETCH_GET_ROOM_SUCCESS,
    FetchGetBookingRoomRequestAction, FetchGetBookingRoomSuccessAction,
    FetchGetRoomRequestAction,
    FetchGetRoomSuccessAction, IBookingSegment,
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

export const fetchBookingRoomRequest = (): FetchGetBookingRoomRequestAction => {
    return {
        type: FETCH_GET_BOOKING_ROOM_REQUEST
    }
}

export const fetchBookingRoomSuccess = (bookingSegments: IBookingSegment[]): FetchGetBookingRoomSuccessAction => {
    return {
        type: FETCH_GET_BOOKING_ROOM_SUCCESS,
        payload: {
            bookingSegments: bookingSegments
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

export function fetchGetBookingRoom(id: string) {
    return function (dispatch: Dispatch<FetchGetBookingRoomRequestAction | FetchGetBookingRoomSuccessAction>){
        dispatch(fetchBookingRoomRequest());
        const date = encodeURIComponent("2022-05-15T00:00:00+03:00");
        axios.get(`https://qroom-server.herokuapp.com/rooms/booking?room_uuid=${id}&date=${date}`)
            .then(response => {
                dispatch(fetchBookingRoomSuccess(response.data));
            });
    }
}
