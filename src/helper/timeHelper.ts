import { IBookingSegment } from "../redux/Room/types";
import {SetStateAction} from "react";

export const timeHelper = (bookingSegments: IBookingSegment[], date: Date, id: string) => {

    const booking = Array<IBookingSegment>();

    let startDay = new Date(date);
    startDay.setHours(8, 0, 0, 0);

    let endDay = new Date(date);
    endDay.setHours(22, 0, 0, 0);

    if (bookingSegments.length === 0) {
        let endTimeMorning = new Date(date);
        endTimeMorning.setHours(13, 0, 0, 0)
        booking.push({
            id: "-1",
            roomUuid: id,
            time: {
                start: startDay,
                end: endTimeMorning,
            },
            adminUuid: "",
            invitedUsers: {},
            status: "",
            title: ""
        })
        let endTimeAfternoon = new Date(date);
        endTimeAfternoon.setHours(18, 0, 0, 0);
        booking.push({
            id: "-1",
            roomUuid: id,
            time: {
                start: endTimeMorning,
                end: endTimeAfternoon,
            },
            adminUuid: "",
            invitedUsers: {},
            status: "",
            title: ""
        })
        booking.push({
            id: "-1",
            roomUuid: id,
            time: {
                start: endTimeAfternoon,
                end: endDay,
            },
            adminUuid: "",
            invitedUsers: {},
            status: "",
            title: ""
        })
    } else {
        bookingSegments.map((bookingSegment) => {
            bookingSegment.time.start = new Date(bookingSegment.time.start);
            bookingSegment.time.end = new Date(bookingSegment.time.end);
        });

        bookingSegments.sort( function (a, b) {
            return a.time.start.valueOf() - b.time.start.valueOf();
        });

        bookingSegments.map((bookingSegment) => {
            if (bookingSegment.time.start.getTime() !== startDay.getTime()) {
                booking.push({
                    id: "-1",
                    roomUuid: id,
                    time: {
                        start: startDay,
                        end: bookingSegment.time.start,
                    },
                    adminUuid: "",
                    invitedUsers: {},
                    status: "",
                    title: ""
                });
                booking.push(bookingSegment);
            } else {
                booking.push(bookingSegment)
            }
            startDay = bookingSegment.time.end;
        });

        if (booking[booking.length - 1].time.end.toLocaleTimeString() !== endDay.toLocaleTimeString()) {
            booking.push({
                id: "-1",
                roomUuid: id,
                time: {
                    start: booking[booking.length - 1].time.end,
                    end: endDay,
                },
                adminUuid: "",
                invitedUsers: {},
                status: "",
                title: ""
            })
        }
    }

    return booking;
};

export const setDurationHelper = (startTime: Date, duration: string) => {
    if (startTime) {
        const endTime = new Date(startTime.getTime());
        new Date(endTime.setMinutes(endTime.getMinutes() + Number(duration)));
        return endTime;
    }
    return startTime;
}

export const setStartTimeHelper = (bookingSegments: IBookingSegment[], startTime: Date, endTime: Date) => {

    let valid: SetStateAction<boolean> = false;

    if (isNaN(startTime.valueOf())) {
        return valid;
    }

    if (startTime.valueOf() >= endTime.valueOf()) {
        return valid;
    }

    bookingSegments.map((bookingSegment) => {
        if (endTime && startTime &&
            bookingSegment.time.start.valueOf() <= startTime.valueOf() &&
            bookingSegment.time.end.valueOf() > startTime.valueOf() && bookingSegment.id === "-1") {
            valid = true;
        }
    });

    return valid;
}

export const setEndTimeHelper = (endTime: Date, startTime: Date, bookingSegments: IBookingSegment[]) => {

    let valid: SetStateAction<boolean> = false;

    if (isNaN(endTime.valueOf())) {
        return valid;
    }

    if (startTime.valueOf() >= endTime.valueOf()) {
        return valid;
    }

    bookingSegments.map((bookingSegment) => {
        if (endTime && startTime &&
            bookingSegment.time.start.valueOf() < endTime.valueOf() &&
            bookingSegment.time.end.valueOf() >= endTime.valueOf() && bookingSegment.id === "-1") {
            valid = true;
        }
    })
    return valid;
}
