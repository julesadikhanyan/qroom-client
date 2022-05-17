import React from "react";
import {Box} from "@mui/material";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchGetHistory} from "../../redux/User/actions";
import Loading from "../../components/Loading";
import {RootState} from "../../redux/store";
import DarkHeader from "../../components/DarkHeader";
import {IUser} from "../../redux/User/types";
import {StyledTypography} from "../Rooms";
import {IBookingSegment, IRoom} from "../../redux/Room/types";
import HistoryTabs from "../../components/HistoryTabs";
import {fetchGetRooms} from "../../redux/Room/actions";

const History = () => {
    const dispatch = useDispatch();

    const loadingHistory = useSelector<RootState, boolean>((state) => state.userReducer.historyLoading);
    const rooms = useSelector<RootState, IRoom[]>((state) => state.roomReducer.rooms);
    const loadingRoom = useSelector<RootState, boolean >((state) => state.roomReducer.loading);
    const user = useSelector<RootState, IUser>((state) => state.userReducer.user);
    const organizedMeetings = useSelector<RootState, IBookingSegment[]>((state) => state.userReducer.organizedMeetings);
    const invitations = useSelector<RootState, IBookingSegment[]>((state) => state.userReducer.invitations);
    const pastMeetings = useSelector<RootState, IBookingSegment[]>((state) => state.userReducer.pastMeetings);

    useEffect(() => {
        const authenticateToken = localStorage.getItem("authenticateToken");
        const id = localStorage.getItem("id");
        authenticateToken && id && dispatch(fetchGetHistory(authenticateToken, id));
        dispatch(fetchGetRooms());
    }, []);

    if (loadingRoom || loadingHistory) {
        return <Loading/>
    }

    return (
        <Box>
            <DarkHeader name={user?.name}/>
            <StyledTypography>HISTORY</StyledTypography>
            <HistoryTabs
                organizedMeetings={organizedMeetings}
                invitations={invitations}
                pastMeetings={pastMeetings}
                rooms={rooms}
            />
        </Box>
    )
};

export default History;