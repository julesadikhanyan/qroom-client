import {Dispatch} from "redux";
import axios from "axios";
import {SetAlertAction} from "../Alert/types";
import {timeHelper} from "../../helper/timeHelper";
import {
    CLEAN_ROOM,
    CleanRoomAction,
    DELETE_ACTIVE_SEGMENT,
    DeleteActiveSegmentAction,
    FETCH_GET_BOOKING_ROOM_FAILURE,
    FETCH_GET_BOOKING_ROOM_REQUEST,
    FETCH_GET_BOOKING_ROOM_SUCCESS,
    FETCH_GET_ROOM_FAILURE,
    FETCH_GET_ROOM_REQUEST,
    FETCH_GET_ROOM_SUCCESS,
    FETCH_GET_ROOMS_FAILURE,
    FETCH_GET_ROOMS_REQUEST,
    FETCH_GET_ROOMS_SUCCESS,
    FETCH_POST_BOOKING_ROOM_FAILURE,
    FETCH_POST_BOOKING_ROOM_REQUEST,
    FETCH_POST_BOOKING_ROOM_SUCCESS,
    FetchGetBookingRoomFailureAction,
    FetchGetBookingRoomRequestAction,
    FetchGetBookingRoomSuccessAction,
    FetchGetRoomFailureAction,
    FetchGetRoomRequestAction,
    FetchGetRoomsFailureAction,
    FetchGetRoomsRequestAction,
    FetchGetRoomsSuccessAction,
    FetchGetRoomSuccessAction,
    FetchPostBookingRoomFailureAction,
    FetchPostBookingRoomRequestAction,
    FetchPostBookingRoomSuccessAction,
    IBookingSegment,
    IError,
    IPostBooking,
    IRoom,
    SET_ACTIVE_SEGMENT,
    SET_LOST_PAGE,
    SetActiveSegmentAction,
    SetLostPageAction
} from "./types";
import {setAlert} from "../Alert/actions";
import {axiosApiInstance} from "../../helper/tokenHelper";

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

export const fetchGetRoomsRequest = (): FetchGetRoomsRequestAction => {
    return {
        type: FETCH_GET_ROOMS_REQUEST
    }
}

export const fetchGetRoomsSuccess = (rooms: IRoom[]): FetchGetRoomsSuccessAction => {
    return {
        type: FETCH_GET_ROOMS_SUCCESS,
        payload: {
            rooms: rooms
        }
    }
}

export const fetchGetRoomsFailure = (error: IError): FetchGetRoomsFailureAction => {
    return {
        type: FETCH_GET_ROOMS_FAILURE,
        payload: {
            error: error
        }
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

export const setLostPage = (lostPage: string): SetLostPageAction => {
    return {
        type: SET_LOST_PAGE,
        payload: {
            lostPage: lostPage
        }
    }
}

export const cleanRoom = (): CleanRoomAction => {
    return {
        type: CLEAN_ROOM
    }
}

export function fetchGetRoom(id: string) {
    return function (dispatch: Dispatch<FetchGetRoomRequestAction | FetchGetRoomSuccessAction | FetchGetRoomFailureAction>){
        dispatch(fetchGetRoomRequest());
        axios.get(`https://69fa-5-167-210-139.ngrok.io/rooms/${id}`)
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
        axios.get(`https://69fa-5-167-210-139.ngrok.io/rooms/booking?room_uuid=${id}&date=${dateStr}`)
            .then(response => {
                const booking = timeHelper(response.data, date, id);
                console.log(response.data);
                dispatch(fetchGetBookingRoomSuccess(booking, date));
            })
            .catch((error) => {
                console.log(error);
                dispatch(fetchGetBookingRoomFailure());
            });
    }
}

export function fetchPostBookingRoom(token: string, postBooking: IPostBooking) {
    return function (dispatch:
                         Dispatch<FetchPostBookingRoomRequestAction
                             | FetchPostBookingRoomSuccessAction
                             | FetchPostBookingRoomFailureAction
                             | SetAlertAction>) {
        dispatch(fetchPostBookingRoomRequest());
        axiosApiInstance.post(`https://69fa-5-167-210-139.ngrok.io/rooms/booking/`, postBooking)
            .then((response: { data: string; status: number; }) => {
                dispatch(fetchPostBookingRoomSuccess());
                dispatch(setAlert({ data: response.data, status: response.status }));
            })
            .catch((error: { response: { data: string; status: number; }; }) => {
                dispatch(fetchPostBookingRoomFailure());
                dispatch(setAlert({ data: error.response.data, status: error.response.status }));
            });
    }
}

export function fetchGetRooms () {
    return function (dispatch: Dispatch<FetchGetRoomsRequestAction | FetchGetRoomsSuccessAction | FetchGetRoomsFailureAction>) {
        dispatch(fetchGetRoomsRequest());
        axios.get("https://69fa-5-167-210-139.ngrok.io/rooms")
            .then(response => {
                dispatch(fetchGetRoomsSuccess(response.data));
            })
            .catch(error => {
                console.log(error.response);
                dispatch(fetchGetRoomsFailure({ data: error.response.data, status: error.response.status }));
            })
    }
}
