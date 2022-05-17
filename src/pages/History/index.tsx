import React from "react";
import {Box} from "@mui/material";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteActiveMeeting, fetchGetHistory, logOutUser, setActiveMeeting} from "../../redux/User/actions";
import Loading from "../../components/Loading";
import {RootState} from "../../redux/store";
import DarkHeader from "../../components/DarkHeader";
import {IUser} from "../../redux/User/types";
import {StyledTypography} from "../Rooms";
import {IBookingSegment, IRoom} from "../../redux/Room/types";
import HistoryTabs from "../../components/HistoryTabs";
import {fetchGetRooms, setLostPage} from "../../redux/Room/actions";

const History = () => {
    const dispatch = useDispatch();

    const loadingHistory = useSelector<RootState, boolean>((state) => state.userReducer.historyLoading);
    const rooms = useSelector<RootState, IRoom[]>((state) => state.roomReducer.rooms);
    const loadingRoom = useSelector<RootState, boolean >((state) => state.roomReducer.loading);
    const user = useSelector<RootState, IUser>((state) => state.userReducer.user);
    const organizedMeetings = useSelector<RootState, IBookingSegment[]>((state) => state.userReducer.organizedMeetings);
    const invitations = useSelector<RootState, IBookingSegment[]>((state) => state.userReducer.invitations);
    const pastMeetings = useSelector<RootState, IBookingSegment[]>((state) => state.userReducer.pastMeetings);
    const activeMeeting = useSelector<RootState, IBookingSegment | null>((state) => state.userReducer.activeMeeting);
    const lostPage = useSelector<RootState, string >((state) => state.roomReducer.lostPage);

    const setActiveMeetingOnPage = (meeting: IBookingSegment) => {
        dispatch(setActiveMeeting(meeting));
    }

    const deleteActiveMeetingOnPage = () => {
        dispatch(deleteActiveMeeting());
    }

    useEffect(() => {
        const authenticateToken = localStorage.getItem("authenticateToken");
        const id = localStorage.getItem("id");
        authenticateToken && id && dispatch(fetchGetHistory(authenticateToken, id));
        dispatch(fetchGetRooms());
    }, []);

    useEffect(() => {
        return () => {
            dispatch(setLostPage("/history"));
        }
    }, []);

    const logOut = () => {
        dispatch(logOutUser());
    }

    if (loadingRoom || loadingHistory) {
        return <Loading/>
    }

    return (
        <Box>
            <DarkHeader name={user?.name} logOut={logOut} lostPage={lostPage}/>
            <StyledTypography>HISTORY</StyledTypography>
            <HistoryTabs
                organizedMeetings={organizedMeetings}
                invitations={invitations}
                pastMeetings={pastMeetings}
                rooms={rooms}
                activeMeeting={activeMeeting}
                setActiveMeeting={setActiveMeetingOnPage}
                deleteActiveMeeting={deleteActiveMeetingOnPage}
            />
        </Box>
    )
};

export default History;