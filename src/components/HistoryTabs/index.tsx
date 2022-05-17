import React, {SyntheticEvent, useState} from "react";
import {Box, Grid, Stack, styled, Tab, Tabs, Typography} from "@mui/material";
import {IBookingSegment, IRoom} from "../../redux/Room/types";
import { RoomBox } from "../../pages/Rooms";
import theme from "../../style/theme";


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
    rooms: IRoom[]
}

const HistoryTabs: React.FC<IHistoryTabsProps>= (props) => {
    const id = localStorage.getItem("id");

    const { organizedMeetings, invitations, pastMeetings, rooms } = props;

    let roomDictionary: {[key: string]: IRoom} = {};

    rooms.forEach((room) => {
        roomDictionary[room.id] = room;
    });

    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            width: "80vw",
            margin: "auto"
        }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Organized meetings" {...a11yProps(0)} />
                    <Tab label="Invitations" {...a11yProps(1)} />
                    <Tab label="Past meetings" {...a11yProps(1)} />
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
                            <RoomBox>
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
                                <RoomBox>
                                    <InfoBox>
                                        <StyledStack spacing={2}>
                                            { id && meeting.invitedUsers[id] === 'PENDING' &&
                                                <StatusTypography
                                                    variant="button"
                                                    sx={{
                                                        backgroundColor: theme.palette.secondary.main,
                                                        color: "#FFFFFF",
                                                        fontWeight: "bold",
                                                        borderRadius: "5px",
                                                        width: "150px",
                                                        textAlign: "center"
                                                    }}
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
                                <RoomBox>
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
        </Box>
    )
};

export default HistoryTabs;