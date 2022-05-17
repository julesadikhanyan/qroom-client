import {
    DELETE_ACTIVE_SEGMENT, FETCH_GET_BOOKING_ROOM_FAILURE,
    FETCH_GET_BOOKING_ROOM_REQUEST,
    FETCH_GET_BOOKING_ROOM_SUCCESS, FETCH_GET_ROOM_FAILURE,
    FETCH_GET_ROOM_REQUEST,
    FETCH_GET_ROOM_SUCCESS, FETCH_POST_BOOKING_ROOM_FAILURE,
    FETCH_POST_BOOKING_ROOM_REQUEST,
    FETCH_POST_BOOKING_ROOM_SUCCESS,
    IRoomState,
    RoomActionTypes,
    SET_ACTIVE_SEGMENT,
    FETCH_GET_ROOMS_REQUEST,
    FETCH_GET_ROOMS_SUCCESS,
    FETCH_GET_ROOMS_FAILURE, SET_LOST_PAGE,
} from "./types";

const initialState: IRoomState = {
    room: null,
    bookingSegments: [],
    activeSegment: null,
    date: new Date(),
    isPostSuccess: false,
    rooms: [],
    loading: true,
    error: null,
    lostPage: "/rooms"
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
        case FETCH_GET_ROOM_FAILURE: {
            return state;
        }
        case FETCH_GET_BOOKING_ROOM_REQUEST: {
            return state;
        }
        case FETCH_GET_BOOKING_ROOM_SUCCESS: {
            return {
                ...state,
                bookingSegments: action.payload.bookingSegments,
                date: action.payload.date
            }
        }
        case FETCH_GET_BOOKING_ROOM_FAILURE: {
            return state;
        }
        case FETCH_POST_BOOKING_ROOM_REQUEST: {
            return state;
        }
        case FETCH_POST_BOOKING_ROOM_SUCCESS: {
            return {
                ...state,
                isPostSuccess: true
            }
        }
        case FETCH_POST_BOOKING_ROOM_FAILURE: {
            return state;
        }
        case FETCH_GET_ROOMS_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_GET_ROOMS_SUCCESS: {
            return {
                ...state,
                rooms: action.payload.rooms,
                loading: false
            }
        }
        case FETCH_GET_ROOMS_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case SET_ACTIVE_SEGMENT: {
            return {
                ...state,
                activeSegment: action.payload.activeSegment
            }
        }
        case DELETE_ACTIVE_SEGMENT: {
            return {
                ...state,
                activeSegment: initialState.activeSegment
            }
        }
        case SET_LOST_PAGE: {
            return {
                ...state,
                lostPage: action.payload.lostPage
            }
        }
        default: return state;
    }
}
