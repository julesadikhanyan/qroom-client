import React, {useState, useEffect} from "react";
import { Grid, Box, Typography, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import DarkHeader from "../../components/DarkHeader";
import theme from "../../style/theme";
import BookingForm from "../../components/BookingForm";
import {deleteActiveSegment, fetchGetBookingRoom, fetchGetRoom, setActiveSegment} from "../../redux/Room/actions";
import { RootState } from "../../redux/store";
import {IBookingSegment, IRoom} from "../../redux/Room/types";
import {IUser} from "../../redux/User/types";

const Room: React.FC = () => {
    const dispatch = useDispatch();

    const room = useSelector<RootState, IRoom | null>((state) => state.roomReducer.room);
    const bookingSegments = useSelector<RootState, IBookingSegment[]>((state) => state.roomReducer.bookingSegments);
    const activeSegment = useSelector<RootState, IBookingSegment | null>((state) => state.roomReducer.activeSegment);
    const user = useSelector<RootState, IUser | null>((state) => state.userReducer.user);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        dispatch(fetchGetRoom("eb3c28e8-28e9-4788-afa1-758061a2f354"));
        dispatch(fetchGetBookingRoom("eb3c28e8-28e9-4788-afa1-758061a2f354"));
    }, []);

    const setMeetingDate = (newDate: Date | null) => {
        console.log(newDate);
    }

    const setSegment = (bookingSegment: IBookingSegment) => {
        dispatch(setActiveSegment(bookingSegment));
    }

    const deleteSegment = () => {
        dispatch(deleteActiveSegment());
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
                    <DarkHeader name={user?.name}/>
                    <Grid container>
                        <Grid item xs={12} xl={6}>
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
                                <Box>
                                    <Typography sx={{
                                        fontWeight: "bold"
                                    }}>TODAY</Typography>
                                    <Typography sx={{
                                        marginBottom: "10px"
                                    }}>01.03.22</Typography>
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
                        />
                    }
                </Box>
            }
        </>
    )
}

export default Room;
