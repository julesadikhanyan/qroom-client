import React, { useState } from "react";
import {LocalizationProvider, DatePicker, TimePicker} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
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
    Alert,
    useMediaQuery, Autocomplete, Checkbox, styled
} from "@mui/material";

import theme from "../../style/theme";
import {IBookingSegment, IPostBooking} from "../../redux/Room/types";
import {setDurationHelper, setEndTimeHelper, setStartTimeHelper} from "../../helper/timeHelper";
import {IAlert} from "../../redux/Alert/types";
import {ISystemUser} from "../../redux/User/types";

export const HeaderDialogBox = styled(Box)({
    flexGrow: 1,
    display: "flex",
    backgroundColor: theme.palette.primary.main,
});

export const StyledDialogTitle = styled(DialogTitle)({
    flexGrow: 1,
    fontSize: 24,
    [theme.breakpoints.down("md")]: {
        fontSize: 20
    },
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: "10px"
});

export const StyledButton = styled(Button)({
    width: 200,
    backgroundColor: theme.palette.secondary.main,
    color: "#FFFFFF",
    margin: "auto",
    marginBottom: "10px",
    "&:hover": {
        backgroundColor: theme.palette.secondary.main
    }
});

export const StyledCloseIcon = styled(CloseIcon)({
    cursor: "pointer",
    color: "#FFFFFF"
});

export interface IBookingFormProps {
    open: boolean,
    onClose: () => void,
    activeSegment: IBookingSegment,
    setMeetingDateOnPage: (date: Date) => void,
    deleteSegment: () => void,
    bookingRoom: (postBooking: IPostBooking) => void,
    bookingSegments: IBookingSegment[],
    alert: IAlert | null,
    users: ISystemUser[],
    userId: string
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const BookingForm: React.FC<IBookingFormProps> = (props) => {
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const {
        onClose,
        open,
        activeSegment,
        setMeetingDateOnPage,
        deleteSegment,
        bookingRoom,
        bookingSegments,
        alert,
        users,
        userId
    } = props;

    const invitedUsersList = users.filter(function(user) {
         return user.id !== userId;
    });

    const [date, setDate] = useState<Date>(activeSegment.time.start || new Date());
    const [startTime, setStartTime] = useState<Date>(activeSegment.time.start || new Date());
    const [duration, setDuration] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [endTime, setEndTime] = useState<Date>(activeSegment.time.end || new Date());
    const [validStart, setValidStart] = useState<boolean>(true);
    const [validEnd, setValidEnd] = useState<boolean>(true);
    const [invitedUsers, setInvitedUsers] = useState<ISystemUser[]>([]);

    const getUsersList = (users: ISystemUser[]) => {
        const usersList: string[] = [];
        users.map((user) => {
            usersList.push(user.id);
        });

        return usersList;
    };

    const handleChangeDuration = (event: SelectChangeEvent) => {
        let newStartTimeDate = new Date(date);
        newStartTimeDate.setHours(startTime.getHours(), startTime.getMinutes());
        let newEndTimeDate = new Date(date);
        newEndTimeDate.setHours(endTime.getHours(), endTime.getMinutes());
        const newEndTime = setDurationHelper(newStartTimeDate, event.target.value);
        setEndTime(newEndTime);
        if (date) {
            setValidEnd(setEndTimeHelper(newEndTime, newStartTimeDate, bookingSegments));
            setValidStart(setStartTimeHelper(bookingSegments, newStartTimeDate, newEndTime));
        }
        setDuration(event.target.value as string);
    };

    const checkStartTime = (newStartTime: Date) => {
        let newStartTimeDate = new Date(date);
        newStartTimeDate.setHours(newStartTime.getHours(), newStartTime.getMinutes());
        let newEndTimeDate = new Date(date);
        newEndTimeDate.setHours(endTime.getHours(), endTime.getMinutes());
        setValidStart(setStartTimeHelper(bookingSegments, newStartTimeDate, newEndTimeDate));
        setValidEnd(setEndTimeHelper(newEndTimeDate, newStartTimeDate, bookingSegments));
        setDuration("");
        setStartTime(newStartTimeDate);
    }

    const checkEndTime = (newEndTime: Date) => {
        let newEndTimeDate = new Date(date);
        newEndTimeDate.setHours(newEndTime.getHours(), newEndTime.getMinutes());
        let newStartTimeDate = new Date(date);
        newStartTimeDate.setHours(startTime.getHours(), startTime.getMinutes());
        if (date) {
            setValidEnd(setEndTimeHelper(newEndTimeDate, newStartTimeDate, bookingSegments));
            setValidStart(setStartTimeHelper(bookingSegments, newStartTimeDate, newEndTimeDate));

        }
        setEndTime(newEndTimeDate);
        setDuration("");
    }

    const setMeetingDate = (newDate: Date) => {
        const start = new Date(newDate);
        start.setHours(8,0,0,0);
        const end = new Date(newDate);
        end.setHours(22, 0, 0,0);
        setDate(newDate);
        setStartTime(start);
        setValidStart(true);
        setValidEnd(true);
        setEndTime(end);
        setDuration("");
        setTitle("");
        setMeetingDateOnPage(newDate);
    };

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const onSubmit = (postBooking: IPostBooking) => {
        bookingRoom(postBooking);
    }

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
            <HeaderDialogBox>
                <StyledDialogTitle>BOOKING THE MEETING ROOM</StyledDialogTitle>
                <StyledCloseIcon
                    sx={{
                        cursor: "pointer",
                        color: "#FFFFFF"
                    }}
                    onClick={() => {
                        onClose();
                        deleteSegment();
                        setMeetingDateOnPage(date);
                    }}
                />
            </HeaderDialogBox>
            {
                alert &&
                <Alert
                    severity={(alert.status === 200 || alert.status === 201) ? "success" : "error"}>
                    {alert.data}
                </Alert>
            }
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
                                    newDate && setMeetingDate(newDate)
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
                                    newStartTime && checkStartTime(newStartTime)
                                }}
                                ampm={false}
                                minutesStep={5}
                                minTime={new Date(new Date().setHours(8, 0, 0, 0))}
                                maxTime={new Date(new Date().setHours(21, 45, 0, 0))}
                                value={startTime}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        fullWidth
                                        error={!validStart}
                                        helperText={!validStart && "Invalid start time"}
                                    />
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
                                    newEndTime && checkEndTime(newEndTime)
                                }}
                                ampm={false}
                                minutesStep={5}
                                minTime={new Date(new Date().setHours(8, 15, 0, 0))}
                                maxTime={new Date(new Date().setHours(22, 0, 0, 0))}
                                value={endTime}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        fullWidth
                                        error={!validEnd}
                                        helperText={!validEnd && "Invalid end time"}
                                    />
                                }
                            />
                        </LocalizationProvider>
                    </Box>
                    {
                        invitedUsersList &&
                        <Autocomplete
                            multiple
                            options={invitedUsersList}
                            disableCloseOnSelect
                            getOptionLabel={(option) => `${option.login} - ${option.name}`}
                            onChange={(event,
                                       value) => setInvitedUsers(value)}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.login} - {option.name}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} label="Invite users" placeholder="Invited users" />
                            )}
                        />
                    }
                </Stack>
            </DialogContent>
            <StyledButton
                onClick={() => {
                    const usersList = getUsersList(invitedUsers);
                    onSubmit({
                        title: title,
                        roomUuid: activeSegment.roomUuid,
                        time: {
                            start: startTime.toISOString(),
                            end: endTime.toISOString()
                        },
                        invitedUsers: usersList
                    });
                }}
            >
                BOOK ROOM
            </StyledButton>
        </Dialog>
    )
}

export default BookingForm;
