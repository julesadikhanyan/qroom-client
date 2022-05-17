import {IBookingSegment} from "../redux/Room/types";

export const historyHelper = (history: IBookingSegment[], adminId: string) => {
    const organizedMeetings: IBookingSegment[] = [];
    const invitations: IBookingSegment[] = [];
    const pastMeetings: IBookingSegment[] = [];

    history.map((historyItem) => {
        if (new Date(historyItem.time.end).valueOf() < new Date().valueOf()) {
            pastMeetings.push(historyItem);
        } else if (historyItem.adminUuid === adminId) {
            organizedMeetings.push(historyItem);
        } else {
            invitations.push(historyItem);
        }
    })

    return { organizedMeetings, pastMeetings, invitations };
};
