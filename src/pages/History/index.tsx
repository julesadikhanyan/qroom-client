import React from "react";
import {Box} from "@mui/material";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    cleanError,
    deleteActiveMeeting,
    fetchGetHistory,
    fetchGetUsers,
    logOutUser,
    setActiveMeeting
} from "../../redux/User/actions";
import Loading from "../../components/Loading";
import {RootState} from "../../redux/store";
import DarkHeader from "../../components/DarkHeader";
import {ISystemUser, IUser} from "../../redux/User/types";
import {StyledTypography} from "../Rooms";
import {IBookingSegment, IRoom} from "../../redux/Room/types";
import HistoryTabs from "../../components/HistoryTabs";
import {fetchCancelMeeting, fetchChangeStatus, fetchGetRooms, setLostPage} from "../../redux/Room/actions";
import {useHistory} from "react-router-dom";

const History = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const loadingHistory = useSelector<RootState, boolean>((state) => state.userReducer["historyLoading"]);
    const rooms = useSelector<RootState, IRoom[]>((state) => state.roomReducer["rooms"]);
    const loadingRoom = useSelector<RootState, boolean >((state) => state.roomReducer["loading"]);
    const user = useSelector<RootState, IUser>((state) => state.userReducer["user"]);
    const organizedMeetings = useSelector<RootState, IBookingSegment[]>((state) => state.userReducer["organizedMeetings"]);
    const invitations = useSelector<RootState, IBookingSegment[]>((state) => state.userReducer["invitations"]);
    const pastMeetings = useSelector<RootState, IBookingSegment[]>((state) => state.userReducer["pastMeetings"]);
    const activeMeeting = useSelector<RootState, IBookingSegment | null>((state) => state.userReducer["activeMeeting"]);
    const lostPage = useSelector<RootState, string >((state) => state.roomReducer["lostPage"]);
    const systemUsers = useSelector<RootState, ISystemUser[]>((state) => state.userReducer["systemUsers"]);
    const isPostSuccess = useSelector<RootState, boolean>((state) => state.roomReducer["isPostSuccess"]);

    const setActiveMeetingOnPage = (meeting: IBookingSegment) => {
        dispatch(setActiveMeeting(meeting));
    }

    const deleteActiveMeetingOnPage = () => {
        dispatch(deleteActiveMeeting());
    }

    const cancelMeeting = (bookingId: string) => {
        dispatch(fetchCancelMeeting(bookingId));
    }

    const changeStatus = (bookingId: string) => {
        dispatch(fetchChangeStatus(bookingId));
    }

    useEffect(() => {
        const authenticateToken = localStorage.getItem("authenticateToken");
        const id = localStorage.getItem("id");
        authenticateToken && id && dispatch(fetchGetHistory(authenticateToken, id));
        authenticateToken && dispatch(fetchGetUsers(authenticateToken));
        dispatch(fetchGetRooms());
    }, [isPostSuccess]);

    useEffect(() => {
        return () => {
            dispatch(setLostPage("/history"));
            dispatch(cleanError());
        }
    }, []);

    const logOut = () => {
        dispatch(logOutUser());
        history.push("/login");
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
                systemUsers={systemUsers}
                cancelMeeting={cancelMeeting}
                isPostStatus={isPostSuccess}
                changeStatus={changeStatus}
            />
        </Box>
    )
};

export default History;