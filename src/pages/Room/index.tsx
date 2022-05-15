import React, {useState, useEffect} from "react";
import { Grid, Box, Typography, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import DarkHeader from "../../components/DarkHeader";
import theme from "../../style/theme";
import BookingForm from "../../components/BookingForm";
import {fetchGetBookingRoom, fetchGetRoom, setActiveSegment} from "../../redux/Room/actions";
import { RootState } from "../../redux/store";
import {IBookingSegment, IRoom} from "../../redux/Room/types";

const Room: React.FC = () => {
    const dispatch = useDispatch();

    const room = useSelector<RootState, IRoom | null>((state) => state.room);
    const bookingSegments = useSelector<RootState, IBookingSegment[]>((state) => state.bookingSegments);
    const activeSegment = useSelector<RootState, IBookingSegment | null>((state) => state.activeSegment);
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

    return (
        <>
            {
                room &&
                <Box sx={{
                    height: "100vh"
                }}>
                    <DarkHeader/>
                    <Grid container>
                        <Grid item xs={6}>
                            <Box sx={{
                                textAlign: "center",
                                paddingTop: "40px"
                            }}>
                                <Stack spacing={2}>
                                    <Typography sx={{
                                        fontSize: 36
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
                                                    handleClickOpen();
                                                    dispatch(setActiveSegment(bookingSegment));
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
                        <Grid item xs={6}>
                            <Box sx={{
                                backgroundColor: theme.palette.primary.main,
                                width: "50vw",
                                height: "calc(100vh - 70px)"
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
                        />
                    }
                </Box>
            }
        </>
    )
}

export default Room;
