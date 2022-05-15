import React, { useState } from "react";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
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
    Box
} from "@mui/material";

import theme from "../../style/theme";
import {IBookingSegment} from "../../redux/Room/types";
import {setDurationHelper} from "../../helper/timeHelper";

export interface IBookingFormProps {
    open: boolean,
    onClose: () => void,
    activeSegment: IBookingSegment,
    setMeetingDateOnPage: (date: Date | null) => void,
    deleteSegment: () => void;
}

const BookingForm: React.FC<IBookingFormProps> = (props) => {
    const { onClose, open, activeSegment, setMeetingDateOnPage, deleteSegment } = props;

    const [date, setDate] = useState<Date | null>(activeSegment.time.start || new Date());
    const [startTime, setStartTime] = useState<Date | null>(activeSegment.time.start || new Date());
    const [duration, setDuration] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const handleCloseForm = () => {
        onClose();
    };

    const handleChangeDuration = (event: SelectChangeEvent) => {
        console.log(startTime && setDurationHelper(startTime, event.target.value));
        setDuration(event.target.value as string);
    };

    const setMeetingDate = (newDate: Date | null) => {
        setDate(newDate);
        setMeetingDateOnPage(newDate);
    };

    const onSubmit = () => {
        console.log(date, startTime, duration, title);
    }

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    return (
        <Dialog
            onClose={handleCloseForm}
            open={open}
            maxWidth="md"
            PaperProps={{ sx: {
                    color: theme.palette.primary.main,
                    width: "50vw"
                }}}
        >
            <DialogTitle
                sx={{
                    fontSize: 24,
                    backgroundColor: theme.palette.primary.main,
                    color: "#FFFFFF",
                    textAlign: "center",
                    marginBottom: "10px"
                }}
            >
                BOOKING THE MEETING ROOM
            </DialogTitle>
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
                                onChange={(newDate) => {
                                    setMeetingDate(newDate)
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
                                    setStartTime(newStartTime)
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
                    onSubmit();
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
