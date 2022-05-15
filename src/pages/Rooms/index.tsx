import React from "react";
import { Typography, Box, styled, Grid } from "@mui/material";
import { useHistory } from "react-router-dom";

import theme from "../../style/theme";
import LightHeader from "../../components/LightHeader";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {IUser} from "../../redux/User/types";

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
    const history = useHistory();

    const user = useSelector<RootState, IUser | null>((state) => state.userReducer.user);

    return (
        <Box sx={{ marginBottom: "20px", width: "80vw", margin: "auto" }}>
            <LightHeader name={user?.name}/>
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
                columns={{ xl: 12, md: 12, xs: 12 }}
                rowSpacing={2}
                sx={{
                    margin: "auto"
                }}
            >
                {
                    listOfRooms.map((room) =>
                        <Grid key={room} item xl={4} md={6} xs={12}>
                            <Box
                                onClick={() => history.push("/room")}
                                sx={{
                                    width: 290,
                                    height: 350,
                                    backgroundColor: theme.palette.primary.main,
                                    borderRadius: 2,
                                    cursor: "pointer",
                                    margin: "auto",
                                    [theme.breakpoints.only('xs')]: {
                                        width: 260,
                                        height: 330
                                    }
                                }}
                            >
                            </Box>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    )
}

export default Rooms;
