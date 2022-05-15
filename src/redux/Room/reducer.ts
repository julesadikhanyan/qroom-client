import {
    FETCH_GET_ROOM_REQUEST,
    FETCH_GET_ROOM_SUCCESS,
    RoomActionTypes,
    IRoomState
} from "./types";

const initialState: IRoomState = {
    room: null
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
        default: return state;
    }
}
