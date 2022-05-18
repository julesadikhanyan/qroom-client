export const FETCH_GET_ROOM_REQUEST = "FETCH_GET_ROOM_REQUEST";
export const FETCH_GET_ROOM_SUCCESS = "FETCH_GET_ROOM_SUCCESS";
export const FETCH_GET_ROOM_FAILURE = "FETCH_GET_ROOM_FAILURE";

export const FETCH_GET_BOOKING_ROOM_REQUEST = "FETCH_GET_BOOKING_ROOM_REQUEST";
export const FETCH_GET_BOOKING_ROOM_SUCCESS = "FETCH_GET_BOOKING_ROOM_SUCCESS";
export const FETCH_GET_BOOKING_ROOM_FAILURE = "FETCH_GET_BOOKING_ROOM_FAILURE";

export const FETCH_POST_BOOKING_ROOM_REQUEST = "FETCH_POST_BOOKING_ROOM_REQUEST";
export const FETCH_POST_BOOKING_ROOM_SUCCESS = "FETCH_POST_BOOKING_ROOM_SUCCESS";
export const FETCH_POST_BOOKING_ROOM_FAILURE = "FETCH_POST_BOOKING_ROOM_FAILURE";

export const FETCH_GET_ROOMS_REQUEST = "FETCH_GET_ROOMS_REQUEST";
export const FETCH_GET_ROOMS_SUCCESS = "FETCH_GET_ROOMS_SUCCESS";
export const FETCH_GET_ROOMS_FAILURE = "FETCH_GET_ROOMS_FAILURE";

export const SET_ACTIVE_SEGMENT = "SET_ACTIVE_SEGMENT";
export const DELETE_ACTIVE_SEGMENT = "DELETE_ACTIVE_SEGMENT";

export const SET_LOST_PAGE = "SET_LOST_PAGE";

export const CLEAN_ROOM = "CLEAN_ROOM";

export const FETCH_CANCEL_MEETING_REQUEST = "FETCH_CANCEL_MEETING_REQUEST";
export const FETCH_CANCEL_MEETING_SUCCESS = "FETCH_CANCEL_MEETING_SUCCESS";
export const FETCH_CANCEL_MEETING_FAILURE = "FETCH_CANCEL_MEETING_FAILURE";

export const FETCH_CHANGE_STATUS_REQUEST = "FETCH_CHANGE_STATUS_REQUEST";
export const FETCH_CHANGE_STATUS_SUCCESS = "FETCH_CHANGE_STATUS_SUCCESS";
export const FETCH_CHANGE_STATUS_FAILURE = "FETCH_CHANGE_STATUS_FAILURE";

export interface IRoom {
    id: string,
    name: string,
    photoUrl: string,
    numberOfSeats: number,
    floor: number,
    isFree: boolean
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
    data: string,
    status: number
}

export interface IPostBooking {
    title: string,
    roomUuid: string,
    time: ITimeStr,
    invitedUsers: string[]
}

export interface ITimeStr {
    start: string,
    end: string
}


export interface IRoomState {
    room: IRoom | null,
    bookingSegments: IBookingSegment[],
    activeSegment: IBookingSegment | null,
    date: Date,
    isPostSuccess: boolean,
    rooms: IRoom[],
    loading: boolean,
    error: IError | null,
    lostPage: string
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

export interface FetchGetRoomFailureAction {
    type: typeof FETCH_GET_ROOM_FAILURE
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

export interface FetchGetBookingRoomFailureAction {
    type: typeof FETCH_GET_BOOKING_ROOM_FAILURE
}

export interface FetchPostBookingRoomRequestAction {
    type: typeof FETCH_POST_BOOKING_ROOM_REQUEST
}

export interface FetchPostBookingRoomSuccessAction {
    type: typeof FETCH_POST_BOOKING_ROOM_SUCCESS
}

export interface FetchPostBookingRoomFailureAction {
    type: typeof FETCH_POST_BOOKING_ROOM_FAILURE
}

export interface FetchGetRoomsRequestAction {
    type: typeof FETCH_GET_ROOMS_REQUEST
}

export interface FetchGetRoomsSuccessAction {
    type: typeof FETCH_GET_ROOMS_SUCCESS,
    payload: {
        rooms: IRoom[]
    }
}

export interface FetchGetRoomsFailureAction {
    type: typeof FETCH_GET_ROOMS_FAILURE,
    payload: {
        error: IError
    }
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

export interface SetLostPageAction {
    type: typeof SET_LOST_PAGE,
    payload: {
        lostPage: string
    }
}

export interface CleanRoomAction {
    type: typeof CLEAN_ROOM
}

export interface FetchCancelMeetingRequestAction {
    type: typeof FETCH_CANCEL_MEETING_REQUEST
}

export interface FetchCancelMeetingSuccessAction {
    type: typeof FETCH_CANCEL_MEETING_SUCCESS
}

export interface FetchCancelMeetingFailureAction {
    type: typeof FETCH_CANCEL_MEETING_FAILURE
}

export interface FetchChangeStatusRequestAction {
    type: typeof FETCH_CHANGE_STATUS_REQUEST
}

export interface FetchChangeStatusSuccessAction {
    type: typeof FETCH_CHANGE_STATUS_SUCCESS
}

export interface FetchChangeStatusFailureAction {
    type: typeof FETCH_CHANGE_STATUS_FAILURE
}

export type RoomActionTypes =
    | FetchGetRoomRequestAction
    | FetchGetRoomSuccessAction
    | FetchGetBookingRoomRequestAction
    | FetchGetBookingRoomSuccessAction
    | FetchPostBookingRoomRequestAction
    | FetchPostBookingRoomSuccessAction
    | SetActiveSegmentAction
    | DeleteActiveSegmentAction
    | FetchPostBookingRoomFailureAction
    | FetchGetRoomFailureAction
    | FetchGetBookingRoomFailureAction
    | FetchGetRoomsRequestAction
    | FetchGetRoomsSuccessAction
    | FetchGetRoomsFailureAction
    | SetLostPageAction
    | CleanRoomAction
    | FetchCancelMeetingFailureAction
    | FetchCancelMeetingRequestAction
    | FetchCancelMeetingSuccessAction
    | FetchChangeStatusFailureAction
    | FetchChangeStatusRequestAction
    | FetchChangeStatusSuccessAction;
