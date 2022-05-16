import {Dispatch} from "redux";
import axios from "axios";

import {timeHelper} from "../../helper/timeHelper";
import {
    DELETE_ACTIVE_SEGMENT,
    DeleteActiveSegmentAction,
    FETCH_GET_BOOKING_ROOM_REQUEST,
    FETCH_GET_BOOKING_ROOM_SUCCESS,
    FETCH_GET_ROOM_REQUEST,
    FETCH_GET_ROOM_SUCCESS,
    FETCH_POST_BOOKING_ROOM_REQUEST,
    FETCH_POST_BOOKING_ROOM_SUCCESS,
    FetchGetBookingRoomRequestAction,
    FetchGetBookingRoomSuccessAction,
    FetchGetRoomRequestAction,
    FetchGetRoomSuccessAction,
    FetchPostBookingRoomRequestAction,
    FetchPostBookingRoomSuccessAction,
    IBookingSegment, IPostBooking,
    IRoom,
    SET_ACTIVE_SEGMENT,
    SetActiveSegmentAction
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

export const fetchBookingRoomSuccess = (bookingSegments: IBookingSegment[], date: Date): FetchGetBookingRoomSuccessAction => {
    return {
        type: FETCH_GET_BOOKING_ROOM_SUCCESS,
        payload: {
            bookingSegments: bookingSegments,
            date: date
        }
    }
}

export const fetchPostBookingRoomRequest = (): FetchPostBookingRoomRequestAction => {
    return {
        type: FETCH_POST_BOOKING_ROOM_REQUEST
    }
}

export const fetchPostBookingRoomSuccess = (): FetchPostBookingRoomSuccessAction => {
    return {
        type: FETCH_POST_BOOKING_ROOM_SUCCESS
    }
}

export const setActiveSegment = (activeSegment: IBookingSegment): SetActiveSegmentAction => {
    return {
        type: SET_ACTIVE_SEGMENT,
        payload: {
            activeSegment: activeSegment
        }
    }
}

export const deleteActiveSegment = (): DeleteActiveSegmentAction => {
    return {
        type: DELETE_ACTIVE_SEGMENT
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

export function fetchGetBookingRoom(id: string, date: Date) {
    const dateStr = date.toLocaleDateString();
    return function (dispatch: Dispatch<FetchGetBookingRoomRequestAction | FetchGetBookingRoomSuccessAction>){
        dispatch(fetchBookingRoomRequest());
        axios.get(`https://qroom-server.herokuapp.com/rooms/booking?room_uuid=${id}&date=${dateStr}`)
            .then(response => {
                const booking = timeHelper(response.data, date);
                dispatch(fetchBookingRoomSuccess(booking, date));
            });
    }
}

export function fetchPostBookingRoom(token: string, postBooking: IPostBooking) {
    return function (dispatch: Dispatch<FetchPostBookingRoomRequestAction | FetchPostBookingRoomSuccessAction>) {
        dispatch(fetchPostBookingRoomRequest());
        const authAxios = axios.create({
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        authAxios.post(`https://qroom-server.herokuapp.com/rooms/booking/`, postBooking)
            .then(() => {
                dispatch(fetchPostBookingRoomSuccess());
            })
    }
}
