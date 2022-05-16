export const FETCH_GET_ROOM_REQUEST = "FETCH_GET_ROOM_REQUEST";
export const FETCH_GET_ROOM_SUCCESS = "FETCH_GET_ROOM_SUCCESS";

export const FETCH_GET_BOOKING_ROOM_REQUEST = "FETCH_GET_BOOKING_ROOM_REQUEST";
export const FETCH_GET_BOOKING_ROOM_SUCCESS = "FETCH_GET_BOOKING_ROOM_SUCCESS";

export const FETCH_POST_BOOKING_ROOM_REQUEST = "FETCH_POST_BOOKING_ROOM_REQUEST";
export const FETCH_POST_BOOKING_ROOM_SUCCESS = "FETCH_POST_BOOKING_ROOM_SUCCESS";

export const SET_ACTIVE_SEGMENT = "SET_ACTIVE_SEGMENT";
export const DELETE_ACTIVE_SEGMENT = "DELETE_ACTIVE_SEGMENT";

export interface IRoom {
    id: string,
    name: string,
    photoUrl: string,
    numberOfSeats: number,
    floor: number
}

export interface IBookingSegment {
    id: string,
    roomUuid: string,
    time: ITime,
    adminUuid: string,
    invitedUsers: IInvitedUsers,
    status: string,
    title: string
}

export interface ITime {
    start: Date,
    end: Date,
}

export interface IInvitedUsers {
    [key: string]: string
}

export interface IError {
    message: string,
    code: string,
    name: string
}

export interface IRoomState {
    room: IRoom | null,
    bookingSegments: IBookingSegment[],
    activeSegment: IBookingSegment | null,
    date: Date | null
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

export interface FetchGetBookingRoomRequestAction {
    type: typeof FETCH_GET_BOOKING_ROOM_REQUEST
}

export interface FetchGetBookingRoomSuccessAction {
    type: typeof FETCH_GET_BOOKING_ROOM_SUCCESS,
    payload: {
        bookingSegments: IBookingSegment[],
        date: Date
    }
}

export interface FetchPostBookingRoomRequestAction {
    type: typeof FETCH_POST_BOOKING_ROOM_REQUEST
}

export interface FetchPostBookingRoomSuccessAction {
    type: typeof FETCH_POST_BOOKING_ROOM_SUCCESS
}


export interface SetActiveSegmentAction {
    type: typeof SET_ACTIVE_SEGMENT,
    payload: {
        activeSegment: IBookingSegment
    }
}

export interface DeleteActiveSegmentAction {
    type: typeof DELETE_ACTIVE_SEGMENT
}

export type RoomActionTypes =
    | FetchGetRoomRequestAction
    | FetchGetRoomSuccessAction
    | FetchGetBookingRoomRequestAction
    | FetchGetBookingRoomSuccessAction
    | FetchPostBookingRoomRequestAction
    | FetchPostBookingRoomSuccessAction
    | SetActiveSegmentAction
    | DeleteActiveSegmentAction;
