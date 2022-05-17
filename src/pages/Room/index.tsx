import React, {useState, useEffect} from "react";
import {Grid, Box, Typography, Stack, TextField} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import DarkHeader from "../../components/DarkHeader";
import theme from "../../style/theme";
import BookingForm from "../../components/BookingForm";
import {
    deleteActiveSegment,
    fetchGetBookingRoom,
    fetchGetRoom, fetchPostBookingRoom,
    setActiveSegment, setLostPage
} from "../../redux/Room/actions";
import { RootState } from "../../redux/store";
import {IBookingSegment, IPostBooking, IRoom} from "../../redux/Room/types";
import {IInvitedUser, IUser} from "../../redux/User/types";
import {IAlert} from "../../redux/Alert/types";
import {deleteAlert} from "../../redux/Alert/actions";
import {fetchGetUsers, logOutUser} from "../../redux/User/actions";
import {useParams} from "react-router-dom";
import Loading from "../../components/Loading";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const Room: React.FC = () => {
    const dispatch = useDispatch();

    const room = useSelector<RootState, IRoom | null>((state) => state.roomReducer["room"]);
    const bookingSegments = useSelector<RootState, IBookingSegment[]>((state) => state.roomReducer["bookingSegments"]);
    const activeSegment = useSelector<RootState, IBookingSegment | null>((state) => state.roomReducer["activeSegment"]);
    const user = useSelector<RootState, IUser | null>((state) => state.userReducer.user);
    const date = useSelector<RootState, Date>((state) => state.roomReducer["date"]);
    const isPostSuccess = useSelector<RootState, boolean>((state) => state.roomReducer["isPostSuccess"]);
    const alert = useSelector<RootState, IAlert | null>((state) => state.alertReducer.alert);
    const users = useSelector<RootState, IInvitedUser[]>((state) => state.userReducer.invitedUsers);
    const lostPage = useSelector<RootState, string>((state) => state.roomReducer["lostPage"]);
    const loading = useSelector<RootState, boolean>((state) => state.roomReducer.loading);
    const params = useParams<{id?: string}>();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        const authenticateToken = localStorage.getItem("authenticateToken");
        authenticateToken && dispatch(fetchGetUsers(authenticateToken));
        setOpen(true);
    }

    const handleClose = () => {
        dispatch(deleteAlert());
        setOpen(false);
    }

    const logOut = () => {
        dispatch(logOutUser());
    }

    useEffect(() => {
        params.id && dispatch(fetchGetRoom(params.id));
    }, []);

    useEffect(() => {
        params.id && dispatch(fetchGetBookingRoom(params.id, date));
    }, [isPostSuccess]);

    useEffect(() => {
        const id = params.id;
        return () => {
            dispatch(setLostPage(`/rooms/${id}`))
        }
    }, []);

    const setMeetingDate = (newDate: Date) => {
        params.id && dispatch(fetchGetBookingRoom(params.id, newDate));
    }

    const setSegment = (bookingSegment: IBookingSegment) => {
        dispatch(setActiveSegment(bookingSegment));
    }

    const deleteSegment = () => {
        dispatch(deleteActiveSegment());
    }

    const bookingRoom = (postBooking: IPostBooking) => {
        const authenticateToken = localStorage.getItem("authenticateToken");
        authenticateToken && dispatch(fetchPostBookingRoom(authenticateToken, postBooking));
    }

    if (loading) {
        return <Loading/>
    }


    return (
        <>
            {
                room &&
                <Box sx={{
                    [theme.breakpoints.up("xl")]: {
                        height: "100vh"
                    }
                }}>
                    <DarkHeader name={user?.name} logOut={logOut} lostPage={lostPage}/>
                    <Grid container>
                        <Grid item xs={12} xl={6}>
                            <SimpleBar style={{ maxHeight: "calc(100vh - 70px)" }}>
                                <Box sx={{
                                    textAlign: "center",
                                    paddingTop: "40px"
                                }}>
                                    <Stack spacing={2}>
                                        <Typography sx={{
                                            fontSize: 36,
                                            [theme.breakpoints.down("md")]: {
                                                fontSize: 24
                                            }
                                        }}>Meeting Room {room.name}</Typography>
                                        <Typography>NUMBER OF SEATS: {room.numberOfSeats}</Typography>
                                        <Typography>FLOOR: {room.floor}</Typography>
                                    </Stack>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{
                                            fontWeight: "bold"
                                        }}>BOOKING SCHEDULE</Typography>
                                        <Box sx={{
                                            width: "50%",
                                            margin: "auto",
                                            marginBottom: "20px",
                                            marginTop: "20px"
                                        }}>
                                            {
                                                date &&
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        disableMaskedInput
                                                        onChange={(newDate) => {
                                                            newDate && setMeetingDate(newDate)
                                                        }}
                                                        value={date}
                                                        minDate={new Date()}
                                                        renderInput={(params) =>
                                                            <TextField {...params} fullWidth/>
                                                        }
                                                    />
                                                </LocalizationProvider>
                                            }
                                        </Box>
                                        {
                                            bookingSegments.length > 0 && bookingSegments.map((bookingSegment)  =>
                                                <Box
                                                    key={bookingSegment.time.start.getTime()}
                                                    onClick={() => {
                                                        if (bookingSegment.id === "-1") {
                                                            handleClickOpen();
                                                            setSegment(bookingSegment);
                                                        }
                                                    }}
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        height: 70,
                                                        backgroundColor:
                                                            bookingSegment.id === "-1" ?
                                                                theme.palette.secondary.main : theme.palette.primary.main,
                                                        color: "#FFFFFF",
                                                        borderBottom: "1px solid #FFFFFF",
                                                        padding: "0 20px 0 20px",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <Typography>
                                                        {bookingSegment.time.start.toLocaleTimeString().slice(0, 5)} - {
                                                        bookingSegment.time.end.toLocaleTimeString().slice(0, 5)}
                                                    </Typography>
                                                    <Typography>{bookingSegment.id === "-1" ? "FREE" : "NOT FREE"}</Typography>
                                                </Box>
                                            )
                                        }
                                    </Box>
                                </Box>
                            </SimpleBar>
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <Box sx={{
                                backgroundColor: theme.palette.primary.main,
                                height: "calc(100vh - 70px)",
                                [theme.breakpoints.down("xl")]: {
                                    marginTop: "20px",
                                    height: "100vw"
                                }
                            }}/>
                        </Grid>
                    </Grid>
                    {
                        activeSegment &&
                        <BookingForm
                            open={open}
                            onClose={handleClose}
                            activeSegment={activeSegment}
                            setMeetingDateOnPage={setMeetingDate}
                            deleteSegment={deleteSegment}
                            bookingRoom={bookingRoom}
                            bookingSegments={bookingSegments}
                            alert={alert}
                            users={users}
                        />
                    }
                </Box>
            }
        </>
    )
}

export default Room;
