import React, {useEffect} from "react";
import { Typography, Box, styled, Grid } from "@mui/material";
import { useHistory } from "react-router-dom";

import theme from "../../style/theme";
import LightHeader from "../../components/LightHeader";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {IUser} from "../../redux/User/types";
import {fetchGetRooms} from "../../redux/Room/actions";
import Loading from "../../components/Loading";

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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetRooms());
    }, []);

    const user = useSelector<RootState, IUser | null>((state) => state.userReducer.user);
    const loading = useSelector<RootState, boolean>((state) => state.roomReducer.loading);

    if (loading) {
        return <Loading/>
    }

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
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    borderRadius: 2,
                                    cursor: "pointer",
                                    margin: "auto",
                                    position: "relative",
                                    [theme.breakpoints.only('xs')]: {
                                        width: 260,
                                        height: 330
                                    }
                                }}
                            >
                                <Box sx={{
                                    width: "100%",
                                    height: "30%",
                                    borderRadius: "0 0 5px 5px",
                                    position: "absolute",
                                    bottom: 0,
                                    backgroundColor: "rgba(101, 119, 139, 0.5)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "#FFFFFF",
                                    flexDirection: "column"
                                }}>
                                    <Typography>Meeting Room Seattle</Typography>
                                    <Typography>6 seats</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    )
}

export default Rooms;
