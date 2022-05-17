import React, {useEffect} from "react";
import {Typography, Box, styled, Grid, Alert} from "@mui/material";
import { useHistory } from "react-router-dom";

import theme from "../../style/theme";
import LightHeader from "../../components/LightHeader";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {IUser} from "../../redux/User/types";
import {fetchGetRooms, setLostPage} from "../../redux/Room/actions";
import Loading from "../../components/Loading";
import {IError, IRoom} from "../../redux/Room/types";
import {logOutUser} from "../../redux/User/actions";

export const StyledTypography = styled(Typography)({
    textAlign: "center"
});

export const RoomBox = styled(Box)({
    position: "relative",
    width: 290,
    height: 350,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "5px",
    cursor: "pointer",
    margin: "auto",
    [theme.breakpoints.only('xs')]: {
        width: 260,
        height: 330
    }
});

const Rooms: React.FC = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetRooms());
    }, []);

    const user = useSelector<RootState, IUser | null>((state) => state.userReducer.user);
    const loading = useSelector<RootState, boolean>((state) => state.roomReducer["loading"]);
    const rooms = useSelector<RootState, IRoom[]>((state) => state.roomReducer.rooms);
    const error = useSelector<RootState, IError | null>((state) => state.roomReducer.error);

    const logOut = () => {
        dispatch(logOutUser());
    }

    useEffect(() => {
        return () => {
            dispatch(setLostPage("/rooms"));
        }
    }, []);

    if (loading) {
        return <Loading/>
    }

    return (
        <Box sx={{ width: "80vw", margin: "auto" }}>
            <LightHeader name={user?.name} logOut={logOut}/>
            {
                error &&
                <Alert severity="error">
                    {error.status}
                </Alert>
            }
            {
                rooms.length > 0 &&
                <Box sx={{ marginBottom: "20px" }}>
                    <StyledTypography
                        sx={{
                            fontSize: 72,
                            fontWeight: "bold"
                        }}
                    >
                        QROOM
                    </StyledTypography>
                    <StyledTypography>Scan the QR code of the meeting room and choose the time for booking</StyledTypography>
                    <StyledTypography sx={{ margin: "20px 0 20px 0", fontWeight: "bold"}}>LIST OF ROOMS</StyledTypography>
                    <Grid
                        container
                        columns={{xl: 12, md: 12, xs: 12}}
                        rowSpacing={2}
                    >
                        {
                            rooms.map((room) =>
                                <Grid key={room.id} item xl={4} md={6} xs={12}>
                                    <RoomBox
                                        sx={{ backgroundImage: `url(https://69fa-5-167-210-139.ngrok.io/${room.photoUrl})` }}
                                        onClick={() => history.push(`/rooms/${room.id}`)}>
                                        {
                                            room.isFree &&
                                            <Typography
                                                component="div"
                                                sx={{
                                                    backgroundColor: theme.palette.secondary.main,
                                                    color: "#FFFFFF",
                                                    fontWeight: "bold",
                                                    borderRadius: "5px",
                                                    width: "100px",
                                                    position: "absolute",
                                                    top: "10px",
                                                    right: "10px",
                                                    textAlign: "center"
                                                }}
                                            >
                                                FREE NOW
                                            </Typography>
                                        }
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
                                            <Typography>Meeting Room {room.name}</Typography>
                                            <Typography>{room.numberOfSeats} seats</Typography>
                                        </Box>
                                    </RoomBox>
                                </Grid>
                            )
                        }
                    </Grid>
                </Box>
            }
        </Box>
    )
}

export default Rooms;
