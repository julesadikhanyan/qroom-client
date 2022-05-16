import {Dispatch} from "redux";
import axios from "axios";

import { setAlert } from "../Alert/actions";
import { SetAlertAction } from "../Alert/types";
import {timeHelper} from "../../helper/timeHelper";
import {
    DELETE_ACTIVE_SEGMENT,
    DeleteActiveSegmentAction, FETCH_GET_BOOKING_ROOM_FAILURE,
    FETCH_GET_BOOKING_ROOM_REQUEST,
    FETCH_GET_BOOKING_ROOM_SUCCESS, FETCH_GET_ROOM_FAILURE,
    FETCH_GET_ROOM_REQUEST,
    FETCH_GET_ROOM_SUCCESS, FETCH_POST_BOOKING_ROOM_FAILURE,
    FETCH_POST_BOOKING_ROOM_REQUEST,
    FETCH_POST_BOOKING_ROOM_SUCCESS, FetchGetBookingRoomFailureAction,
    FetchGetBookingRoomRequestAction,
    FetchGetBookingRoomSuccessAction, FetchGetRoomFailureAction,
    FetchGetRoomRequestAction,
    FetchGetRoomSuccessAction, FetchPostBookingRoomFailureAction,
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

export const fetchGetRoomFailure = (): FetchGetRoomFailureAction => {
    return {
        type: FETCH_GET_ROOM_FAILURE
    }
}


export const fetchGetBookingRoomRequest = (): FetchGetBookingRoomRequestAction => {
    return {
        type: FETCH_GET_BOOKING_ROOM_REQUEST
    }
}

export const fetchGetBookingRoomSuccess = (bookingSegments: IBookingSegment[], date: Date): FetchGetBookingRoomSuccessAction => {
    return {
        type: FETCH_GET_BOOKING_ROOM_SUCCESS,
        payload: {
            bookingSegments: bookingSegments,
            date: date
        }
    }
}

export const fetchGetBookingRoomFailure = (): FetchGetBookingRoomFailureAction => {
    return {
        type: FETCH_GET_BOOKING_ROOM_FAILURE
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

export const fetchPostBookingRoomFailure = (): FetchPostBookingRoomFailureAction => {
    return {
        type: FETCH_POST_BOOKING_ROOM_FAILURE
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
    return function (dispatch: Dispatch<FetchGetRoomRequestAction | FetchGetRoomSuccessAction | FetchGetRoomFailureAction>){
        dispatch(fetchGetRoomRequest());
        axios.get(`https://qroom-server.herokuapp.com/rooms/${id}`)
            .then(response => {
                dispatch(fetchGetRoomSuccess(response.data));
            })
            .catch((error) => {
                console.log(error);
                dispatch(fetchGetRoomFailure());
            });
    }
}

export function fetchGetBookingRoom(id: string, date: Date) {
    const dateStr = date.toLocaleDateString();
    return function (dispatch: Dispatch<FetchGetBookingRoomRequestAction | FetchGetBookingRoomSuccessAction | FetchGetBookingRoomFailureAction>){
        dispatch(fetchGetBookingRoomRequest());
        axios.get(`https://qroom-server.herokuapp.com/rooms/booking?room_uuid=${id}&date=${dateStr}`)
            .then(response => {
                const booking = timeHelper(response.data, date);
                dispatch(fetchGetBookingRoomSuccess(booking, date));
            })
            .catch((error) => {
                console.log(error);
                dispatch(fetchGetBookingRoomFailure());
            });
    }
}

export function fetchPostBookingRoom(token: string, postBooking: IPostBooking) {
    return function (dispatch: Dispatch<FetchPostBookingRoomRequestAction | FetchPostBookingRoomSuccessAction | FetchPostBookingRoomFailureAction | SetAlertAction>) {
        dispatch(fetchPostBookingRoomRequest());
        const authAxios = axios.create({
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        authAxios.post(`https://qroom-server.herokuapp.com/rooms/booking/`, postBooking)
            .then((response) => {
                dispatch(fetchPostBookingRoomSuccess());
                dispatch(setAlert({ data: response.data, status: response.status }));
            })
            .catch((error) => {
                console.log(error);
                dispatch(fetchPostBookingRoomFailure());
            });
    }
}
