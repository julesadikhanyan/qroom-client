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
    systemUsers: ISystemUser[]
}

const SimpleDialog: React.FC<IHistoryDialogProps>= (props) => {
    const { onClose, open, meeting, roomName, userId, userStatus, systemUsers } = props;

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
                <StyledTypography variant="h5">PARTICIPANTS:</StyledTypography>
            </DialogContent>
            <DialogActions>
                { (userId === meeting.adminUuid) && (meeting.status === "BOOKED") &&
                    <StyledButton>CANCEL THE MEETING</StyledButton>
                }
                {
                    userId !== meeting.adminUuid && userStatus === "CONFIRMED" &&
                    <StyledButton>I WILL NOT ATTEND</StyledButton>
                }
                {
                    userId !== meeting.adminUuid && userStatus === "REJECTED" &&
                    <StyledButton>I WILL ATTEND</StyledButton>
                }
                {
                    userId !== meeting.adminUuid && userStatus === "REJECTED" &&
                    <Stack spacing={2} direction="row">
                        <StyledButton>I WILL ATTEND</StyledButton>
                        <StyledButton>I WILL NOT ATTEND</StyledButton>
                    </Stack>
                }
            </DialogActions>
        </Dialog>
    );
}

export default SimpleDialog;