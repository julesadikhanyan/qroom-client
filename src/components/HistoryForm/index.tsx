import React from "react";
import {
    DialogContent,
    styled,
    useMediaQuery,
    Dialog,
    Typography,
    DialogActions, Stack
} from "@mui/material";
import theme from "../../style/theme";
import {HeaderDialogBox, StyledButton, StyledCloseIcon, StyledDialogTitle} from "../BookingForm";
import {IBookingSegment} from "../../redux/Room/types";
import {ISystemUser} from "../../redux/User/types";
import InvitedUsersList from "../InvitedUsersList";

const StyledTypography = styled(Typography)({
    fontWeight: "bold"
});

export interface IHistoryDialogProps {
    open: boolean;
    onClose: () => void,
    meeting: IBookingSegment,
    roomName: string,
    userId: string | null,
    userStatus: string,
    systemUsers: ISystemUser[],
    cancelMeeting: (bookingId: string) => void;
    changeStatus: (bookingId: string) => void
}

const SimpleDialog: React.FC<IHistoryDialogProps>= (props) => {
    const { onClose, open, meeting, roomName, userId, userStatus, systemUsers, cancelMeeting, changeStatus } = props;

    const matches = useMediaQuery(theme.breakpoints.down('md'));

    let adminUser: ISystemUser = {
        id: "",
        login: "",
        name: ""
    };

    systemUsers.forEach((user) => {
        if (user.id === meeting.adminUuid) {
            adminUser = user;
        }
    });

    console.log(userStatus);

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
                <StyledDialogTitle>{meeting.title}</StyledDialogTitle>
                <StyledCloseIcon onClick={onClose}/>
            </HeaderDialogBox>
            <DialogContent sx={{ color: theme.palette.primary.main}}>
                <StyledTypography variant="h5">MEETING ROOM: <span style={{ fontWeight: "normal", fontSize: "20px" }}>{roomName}</span></StyledTypography>
                <StyledTypography variant="h5">DATE: <span style={{ fontWeight: "normal", fontSize: "20px" }}>{new Date(meeting.time.start).toLocaleDateString()}</span></StyledTypography>
                <StyledTypography variant="h5">START TIME: <span style={{ fontWeight: "normal", fontSize: "20px" }}>{new Date(meeting.time.start).toLocaleTimeString().slice(0, 5)}</span></StyledTypography>
                <StyledTypography variant="h5">END TIME: <span style={{ fontWeight: "normal", fontSize: "20px" }}>{new Date(meeting.time.end).toLocaleTimeString().slice(0, 5)}</span></StyledTypography>
                <StyledTypography variant="h5">ORGANIZER: <span style={{ fontWeight: "normal", fontSize: "20px" }}>{adminUser.name}</span></StyledTypography>
                <StyledTypography variant="h5">ORGANIZER EMAIL: <span style={{ fontWeight: "normal", fontSize: "20px" }}>{adminUser.login}</span></StyledTypography>
                {
                    meeting.invitedUsers !== {} &&
                    <>
                        <StyledTypography variant="h5">PARTICIPANTS:</StyledTypography>
                        <InvitedUsersList users={meeting.invitedUsers} systemUsers={systemUsers}/>
                    </>
                }
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
                { (userId === meeting.adminUuid) && (meeting.status === "BOOKED") &&
                    <StyledButton onClick={() => cancelMeeting(meeting.id)}>CANCEL THE MEETING</StyledButton>
                }
                {
                    userId !== meeting.adminUuid && userStatus === "CONFIRMED" &&
                    <StyledButton onClick={() => cancelMeeting(meeting.id)}>I WILL NOT ATTEND</StyledButton>
                }
                {
                    userId !== meeting.adminUuid && userStatus === "REJECTED" &&
                    <StyledButton onClick={() => changeStatus(meeting.id)}>I WILL ATTEND</StyledButton>
                }
                {
                    userId !== meeting.adminUuid && userStatus === "PENDING" &&
                    <Stack spacing={2} direction="row">
                        <StyledButton sx={{ height: "50px" }} onClick={() => changeStatus(meeting.id)}>I WILL ATTEND</StyledButton>
                        <StyledButton sx={{ height: "50px" }} onClick={() => cancelMeeting(meeting.id)}>I WILL NOT ATTEND</StyledButton>
                    </Stack>
                }
            </DialogActions>
        </Dialog>
    );
}

export default SimpleDialog;