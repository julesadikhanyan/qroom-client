import {
    FETCH_GET_BOOKING_ROOM_REQUEST,
    FETCH_GET_BOOKING_ROOM_SUCCESS,
    FETCH_GET_ROOM_REQUEST,
    FETCH_GET_ROOM_SUCCESS,
    IRoomState,
    RoomActionTypes
} from "./types";

const initialState: IRoomState = {
    room: null,
    bookingSegments: []
}

export default (state = initialState, action: RoomActionTypes) => {
    switch (action.type) {
        case FETCH_GET_ROOM_REQUEST: {
            return state;
        }
        case FETCH_GET_ROOM_SUCCESS: {
            return {
                ...state,
                room: action.payload.room
            }
        }
        case FETCH_GET_BOOKING_ROOM_REQUEST: {
            return state;
        }
        case FETCH_GET_BOOKING_ROOM_SUCCESS: {
            return {
                ...state,
                bookingSegments: action.payload.bookingSegments
            }
        }
        default: return state;
    }
}
