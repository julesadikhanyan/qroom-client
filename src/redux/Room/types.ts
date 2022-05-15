export const FETCH_GET_ROOM_REQUEST = "FETCH_GET_ROOM_REQUEST";
export const FETCH_GET_ROOM_SUCCESS = "FETCH_GET_ROOM_SUCCESS";

export const FETCH_GET_BOOKING_ROOM_REQUEST = "FETCH_GET_BOOKING_ROOM_REQUEST";
export const FETCH_GET_BOOKING_ROOM_SUCCESS = "FETCH_GET_BOOKING_ROOM_SUCCESS";

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
    start: string,
    end: string
}

export interface IInvitedUsers {
    (key: string): string
}

export interface IRoomState {
    room: IRoom | null,
    bookingSegments: IBookingSegment[]
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
        bookingSegments: IBookingSegment[]
    }
}

export type RoomActionTypes =
    | FetchGetRoomRequestAction
    | FetchGetRoomSuccessAction
    | FetchGetBookingRoomRequestAction
    | FetchGetBookingRoomSuccessAction;
