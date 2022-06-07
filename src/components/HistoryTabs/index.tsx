import React, {SyntheticEvent, useEffect, useState} from "react";
import {Box, Grid, Stack, styled, Tab, Tabs, Typography} from "@mui/material";
import {IBookingSegment, IRoom} from "../../redux/Room/types";
import { RoomBox } from "../../pages/Rooms";
import theme from "../../style/theme";
import HistoryForm from "../HistoryForm";
import {ISystemUser} from "../../redux/User/types";
import {serverURL} from "../../redux/Room/actions";

export const InfoBox = styled(Box)({
    width: "100%",
    height: "100%",
    borderRadius: "5px",
    backgroundColor: "rgba(101, 119, 139, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#FDFDFD",
    flexDirection: "column"
});

const StyledStack = styled(Stack)({
    width: "90%",
    display: "flex",
    alignItems: "center",
    textAlign: "center"
});

const StatusTypography = styled(Typography)({
    color: "#FFFFFF",
    fontWeight: "bold",
    borderRadius: "5px",
    width: "150px",
    textAlign: "center"
});

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`history-tabpanel-${index}`}
            aria-labelledby={`history-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `history-tab-${index}`,
        'aria-controls': `history-tabpanel-${index}`,
    };
}

export interface IHistoryTabsProps {
    organizedMeetings: IBookingSegment[],
    invitations: IBookingSegment[],
    pastMeetings: IBookingSegment[],
    rooms: IRoom[],
    activeMeeting: IBookingSegment | null,
    setActiveMeeting: (meeting: IBookingSegment) => void,
    deleteActiveMeeting: () => void,
    systemUsers: ISystemUser[],
    cancelMeeting: (bookingId: string) => void,
    isPostStatus: boolean,
    changeStatus: (bookingId: string) => void
}

const HistoryTabs: React.FC<IHistoryTabsProps>= (props) => {
    const {
        organizedMeetings,
        invitations,
        pastMeetings,
        rooms,
        activeMeeting,
        setActiveMeeting,
        deleteActiveMeeting,
        systemUsers,
        cancelMeeting,
        isPostStatus,
        changeStatus
    } = props;

    const id = localStorage.getItem("id");

    let roomDictionary: {[key: string]: IRoom} = {};

    rooms.forEach((room) => {
        roomDictionary[room.id] = room;
    });

    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(true)
    }, [activeMeeting !== null]);

    const handleOpen = (meeting: IBookingSegment) => {
        setActiveMeeting(meeting);
    };

    const handleClose = () => {
        setOpen(false);
        deleteActiveMeeting();
    };

    useEffect(() => {
        handleClose();
    }, [isPostStatus]);

    return (
        <Box sx={{
            width: "80vw",
            margin: "auto"
        }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Organized meetings" {...a11yProps(0)} />
                    <Tab label="Invitations" {...a11yProps(1)} />
                    <Tab label="Past meetings" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Grid
                    container
                    columns={{ xl: 12, md: 12, xs: 12 }}
                    rowSpacing={2}
                >
                {
                    organizedMeetings.length > 0 && organizedMeetings.map((meeting) =>
                        <Grid key={meeting.id} item xl={4} md={6} xs={12}>
                            <RoomBox onClick={() => handleOpen(meeting)} sx={{
                                backgroundSize: "cover",
                                backgroundImage: `url(${serverURL}/images/${roomDictionary[meeting.roomUuid].photoUrl})` }}
                            >
                                <InfoBox>
                                    <StyledStack spacing={2}>
                                        { meeting.status === "CANCELED" &&
                                            <StatusTypography
                                                variant="button"
                                                sx={{ backgroundColor: theme.palette.warning.main }}
                                            >
                                                CANCELED
                                            </StatusTypography>
                                        }
                                        <Typography variant="h5">{meeting.title}</Typography>
                                        <Typography>Meeting Room {roomDictionary[meeting.roomUuid].name}</Typography>
                                        <Typography>{new Date(meeting.time.start).toLocaleDateString()}</Typography>
                                        <Typography>
                                            {new Date(meeting.time.start).toLocaleTimeString().slice(0, 5)} - {new Date(meeting.time.end).toLocaleTimeString().slice(0, 5)}
                                        </Typography>
                                    </StyledStack>
                                </InfoBox>
                            </RoomBox>
                        </Grid>
                    )
                }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid
                    container
                    columns={{ xl: 12, md: 12, xs: 12 }}
                    rowSpacing={2}
                >
                    {
                        invitations.length > 0 && invitations.map((meeting) =>
                            <Grid key={meeting.id} item xl={4} md={6} xs={12}>
                                <RoomBox onClick={() => handleOpen(meeting)} sx={{
                                    backgroundSize: "cover",
                                    backgroundImage: `url(${serverURL}/images/${roomDictionary[meeting.roomUuid].photoUrl})`
                                }}>
                                    <InfoBox>
                                        <StyledStack spacing={2}>
                                            { id && meeting.invitedUsers[id] === 'PENDING' &&
                                                <StatusTypography
                                                    variant="button"
                                                    sx={{ backgroundColor: theme.palette.secondary.main }}
                                                >
                                                    PENDING
                                                </StatusTypography>
                                            }
                                            { id && meeting.invitedUsers[id] === 'CONFIRMED' &&
                                                <StatusTypography
                                                    variant="button"
                                                    sx={{ backgroundColor: theme.palette.success.main }}
                                                >
                                                    CONFIRMED
                                                </StatusTypography>
                                            }
                                            { id && meeting.invitedUsers[id] === 'REJECTED' &&
                                                <StatusTypography
                                                    variant="button"
                                                    sx={{ backgroundColor: theme.palette.warning.main }}
                                                >
                                                    REJECTED
                                                </StatusTypography>
                                            }
                                            <Typography variant="h5">{meeting.title}</Typography>
                                            <Typography>Meeting Room {roomDictionary[meeting.roomUuid].name}</Typography>
                                            <Typography>{new Date(meeting.time.start).toLocaleDateString()}</Typography>
                                            <Typography>
                                                {new Date(meeting.time.start).toLocaleTimeString().slice(0, 5)} - {new Date(meeting.time.end).toLocaleTimeString().slice(0, 5)}
                                            </Typography>
                                        </StyledStack>
                                    </InfoBox>
                                </RoomBox>
                            </Grid>
                        )
                    }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Grid
                    container
                    columns={{ xl: 12, md: 12, xs: 12 }}
                    rowSpacing={2}
                >
                    {
                        pastMeetings.length > 0 && pastMeetings.map((meeting) =>
                            <Grid key={meeting.id} item xl={4} md={6} xs={12}>
                                <RoomBox onClick={() => handleOpen(meeting)} sx={{
                                    backgroundSize: "cover",
                                    backgroundImage: `url(${serverURL}/images/${roomDictionary[meeting.roomUuid].photoUrl})`
                                }}>
                                    <InfoBox>
                                        <StyledStack spacing={2}>
                                            <Typography variant="h5">{meeting.title}</Typography>
                                            <Typography>Meeting Room {roomDictionary[meeting.roomUuid].name}</Typography>
                                            <Typography>{new Date(meeting.time.start).toLocaleDateString()}</Typography>
                                            <Typography>
                                                {new Date(meeting.time.start).toLocaleTimeString().slice(0, 5)} - {new Date(meeting.time.end).toLocaleTimeString().slice(0, 5)}
                                            </Typography>
                                        </StyledStack>
                                    </InfoBox>
                                </RoomBox>

                            </Grid>
                        )
                    }
                </Grid>
            </TabPanel>
            {
                activeMeeting && id &&
                <HistoryForm
                    open={open}
                    onClose={handleClose}
                    meeting={activeMeeting}
                    roomName={roomDictionary[activeMeeting.roomUuid].name}
                    userId={id}
                    userStatus={activeMeeting.invitedUsers[id]}
                    systemUsers={systemUsers}
                    cancelMeeting={cancelMeeting}
                    changeStatus={changeStatus}
                />
            }
        </Box>
    )
};

export default HistoryTabs;