import React, { useState } from "react";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CloseIcon from '@mui/icons-material/Close';
import {
    Dialog,
    DialogTitle,
    Typography,
    Button,
    TextField,
    DialogContent,
    Select,
    SelectChangeEvent,
    MenuItem,
    FormControl,
    InputLabel,
    Stack,
    Box,
    useMediaQuery
} from "@mui/material";

import theme from "../../style/theme";
import {IBookingSegment, IPostBooking} from "../../redux/Room/types";
import {setDurationHelper} from "../../helper/timeHelper";

export interface IBookingFormProps {
    open: boolean,
    onClose: () => void,
    activeSegment: IBookingSegment,
    setMeetingDateOnPage: (date: Date) => void,
    deleteSegment: () => void,
    bookingRoom: (postBooking: IPostBooking) => void;
}

const BookingForm: React.FC<IBookingFormProps> = (props) => {
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const { onClose, open, activeSegment, setMeetingDateOnPage, deleteSegment, bookingRoom } = props;

    const [date, setDate] = useState<Date>(activeSegment.time.start || new Date());
    const [startTime, setStartTime] = useState<Date>(activeSegment.time.start || new Date());
    const [duration, setDuration] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [endTime, setEndTime] = useState<Date>(activeSegment.time.end || new Date());

    const handleChangeDuration = (event: SelectChangeEvent) => {
        console.log(startTime && setDurationHelper(startTime, event.target.value));
        setDuration(event.target.value as string);
    };

    const setMeetingDate = (newDate: Date | null) => {
        if (newDate) {
            const start = new Date(newDate);
            start.setHours(8,0,0,0);
            const end = new Date(newDate);
            end.setHours(22, 0, 0,0);
            setDate(newDate);
            setStartTime(start);
            setEndTime(end);
            setDuration("");
            setTitle("");
            setMeetingDateOnPage(newDate);
        }
    };

    const onSubmit = (postBooking: IPostBooking) => {
        bookingRoom(postBooking);
    }

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    return (
        <Dialog
            fullScreen={matches}
            open={open}
            maxWidth="md"
            PaperProps={{ sx: {
                    color: theme.palette.primary.main,
                    [theme.breakpoints.up("md")]: {
                        width: "50vw"
                    }
                }}}
        >
            <Box sx={{
                flexGrow: 1,
                display: "flex",
                backgroundColor: theme.palette.primary.main
            }}>
                <DialogTitle
                    sx={{
                        flexGrow: 1,
                        fontSize: 24,
                        [theme.breakpoints.down("md")]: {
                            fontSize: 20
                        },
                        color: "#FFFFFF",
                        textAlign: "center",
                        marginBottom: "10px"
                    }}
                >
                    BOOKING THE MEETING ROOM
                </DialogTitle>
                <CloseIcon
                    sx={{
                        cursor: "pointer",
                        color: "#FFFFFF"
                    }}
                    onClick={() => {
                        onClose();
                        deleteSegment();
                        setMeetingDateOnPage(new Date());
                    }}
                />
            </Box>
            <DialogContent sx={{
                padding: "10px"
            }}>
                <Stack spacing={2}>
                    <Box>
                        <Typography>Enter meeting title:</Typography>
                        <TextField
                            fullWidth
                            value={title}
                            onChange={handleChangeTitle}
                        />
                    </Box>
                    <Box>
                        <Typography>Select meeting date:</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                onChange={(newStartTime) => {
                                    newStartTime && setMeetingDate(newStartTime)
                                }}
                                value={date}
                                minDate={new Date()}
                                renderInput={(params) =>
                                    <TextField fullWidth {...params}/>
                                }
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <Typography>Select start time:</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                onChange={(newStartTime) => {
                                    newStartTime && setStartTime(newStartTime)
                                }}
                                ampm={false}
                                minutesStep={5}
                                minTime={new Date(new Date().setHours(8, 0, 0, 0))}
                                maxTime={new Date(new Date().setHours(21, 45, 0, 0))}
                                value={startTime}
                                renderInput={(params) =>
                                    <TextField fullWidth {...params}/>
                                }
                            />
                        </LocalizationProvider>
                    </Box>
                    <FormControl sx={{
                        minWidth: "100%"
                    }}
                    >
                        <InputLabel>Duration of the meeting</InputLabel>
                        <Select
                            value={duration}
                            label="Duration of the meeting"
                            onChange={handleChangeDuration}
                        >
                            <MenuItem value={15}>15 min</MenuItem>
                            <MenuItem value={30}>30 min</MenuItem>
                            <MenuItem value={45}>45 min</MenuItem>
                            <MenuItem value={60}>1 hour</MenuItem>
                            <MenuItem value={90}>1 hour 30 min</MenuItem>
                            <MenuItem value={120}>2 hours</MenuItem>
                        </Select>
                    </FormControl>
                    <Box>
                        <Typography>Select end time:</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                onChange={(newEndTime) => {
                                    newEndTime && setEndTime(newEndTime)
                                }}
                                ampm={false}
                                minutesStep={5}
                                minTime={new Date(new Date().setHours(8, 15, 0, 0))}
                                maxTime={new Date(new Date().setHours(22, 0, 0, 0))}
                                value={endTime}
                                renderInput={(params) =>
                                    <TextField fullWidth {...params}/>
                                }
                            />
                        </LocalizationProvider>
                    </Box>
                </Stack>
            </DialogContent>
            <Button
                sx={{
                    width: 200,
                    backgroundColor: theme.palette.secondary.main,
                    color: "#FFFFFF",
                    margin: "auto",
                    marginBottom: "10px",
                    "&:hover": {
                        backgroundColor: theme.palette.secondary.main
                    }
                }}
                onClick={() => {
                    onSubmit({
                        title: title,
                        roomUuid: activeSegment.roomUuid,
                        time: {
                            start: startTime.toISOString(),
                            end: endTime.toISOString()
                        },
                        invitedUsers: []
                    });
                    onClose();
                    deleteSegment();
                }}
            >
                BOOK ROOM
            </Button>
        </Dialog>
    )
}

export default BookingForm;
