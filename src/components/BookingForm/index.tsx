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
    Box,
    styled
} from "@mui/material";

import theme from "../../style/theme";
import {IBookingSegment} from "../../redux/Room/types";

export interface IBookingFormProps {
    open: boolean,
    onClose: () => void,
    activeSegment: IBookingSegment
}

const StyledTextField = styled(TextField)({
    width: "100%"
});

const StyledButton = styled(Button)({
    width: 200,
    backgroundColor: theme.palette.secondary.main,
    color: "#FFFFFF",
    margin: "auto",
    marginBottom: "10px",
    "&:hover": {
        backgroundColor: theme.palette.secondary.main
    }
});

const BookingForm: React.FC<IBookingFormProps> = (props) => {
    const { onClose, open, activeSegment } = props;

    const [date, setDate] = useState<Date | null>(activeSegment.time.start || new Date());
    const [startTime, setStartTime] = useState<Date | null>(activeSegment.time.start || new Date());
    const [duration, setDuration] = useState<string>("");

    const handleCloseForm = () => {
        onClose();
    };

    const handleChangeDuration = (event: SelectChangeEvent) => {
        setDuration(event.target.value as string);
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
                        <Typography>Select meeting date:</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                onChange={(newDate) => {
                                    setDate(newDate)
                                }}
                                value={date}
                                renderInput={(params) =>
                                    <StyledTextField {...params}/>
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
                                value={startTime}
                                renderInput={(params) =>
                                    <StyledTextField {...params}/>
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
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
            <StyledButton>BOOK ROOM</StyledButton>
        </Dialog>
    )
}

export default BookingForm;
