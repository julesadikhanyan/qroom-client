import React from "react";
import { Typography, Box, styled, Grid } from "@mui/material";

import theme from "../../style/theme";

const StyledTypography = styled(Typography)({
    textAlign: "center"
});

const listOfRooms: Array<string> = [
    "Seattle",
    "Chicago",
    "Atlanta",
    "Boston",
    "Dallas",
    "Los Angeles",
    "Houston",
    "Kansas City",
    "Las Vegas",
    "New Orleans",
    "New York",
    "Phoenix"
];

const Rooms: React.FC = () => {
    return (
        <Box sx={{ marginBottom: "20px" }}>
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
                    margin: "20px 0 20px 0",
                    fontWeight: "bold"
                }}
            >
                LIST OF ROOMS
            </StyledTypography>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{
                    margin: "auto"
                }}
            >
                {
                    listOfRooms.map((room) =>
                        <Grid key={room} item xs={4}>
                            <Box sx={{
                                width: 290,
                                height: 350,
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: 2,
                                cursor: "pointer"
                            }}>
                            </Box>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    )
}

export default Rooms;
