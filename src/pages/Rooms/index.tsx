import React from "react";
import { Typography, Box, styled } from "@mui/material";

const StyledTypography = styled(Typography)({
    textAlign: "center"
});

const Rooms: React.FC = () => {
    return (
        <Box>
            <StyledTypography
                sx={{
                    fontSize: 72,
                    fontWeight: "bold"
                }}
            >
                QROOM
            </StyledTypography>
            <StyledTypography>
                Scan the QR code of the meeting room and choose the time for booking
            </StyledTypography>
            <StyledTypography
                sx={{
                    marginTop: 5,
                    fontWeight: "bold"
                }}
            >
                LIST OF ROOMS
            </StyledTypography>
        </Box>
    )
}

export default Rooms;
