import React, {useState, useEffect} from "react";
import { Grid, Box, Typography, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import DarkHeader from "../../components/DarkHeader";
import theme from "../../style/theme";
import BookingForm from "../../components/BookingForm";
import { fetchGetRoom } from "../../redux/Room/actions";
import { RootState } from "../../redux/store";
import { IRoom } from "../../redux/Room/types";

const timeSegments: Array<string> = [
    "08:00-10:00",
    "10:00-12:00",
    "12:00-17:00",
    "17:00-22:00"
]
const Room: React.FC = () => {
    const dispatch = useDispatch();

    const room = useSelector<RootState, IRoom | null>((state) => state.room);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        dispatch(fetchGetRoom("eb3c28e8-28e9-4788-afa1-758061a2f354"));
    }, []);

    return (
        <>
            {
                room &&
                <Box sx={{
                    height: "100vh"
                }}>
                    <DarkHeader/>
                    <Grid container>
                        <Grid item xs={6}>
                            <Box sx={{
                                textAlign: "center",
                                paddingTop: "40px"
                            }}>
                                <Stack spacing={2}>
                                    <Typography sx={{
                                        fontSize: 36
                                    }}>Meeting Room {room.name}</Typography>
                                    <Typography>NUMBER OF SEATS: {room.numberOfSeats}</Typography>
                                    <Typography>FLOOR: {room.floor}</Typography>
                                </Stack>
                                <Box>
                                    <Typography sx={{
                                        fontWeight: "bold"
                                    }}>TODAY</Typography>
                                    <Typography sx={{
                                        marginBottom: "10px"
                                    }}>01.03.22</Typography>
                                    {
                                        timeSegments.map((segment) =>
                                            <Box
                                                key={segment}
                                                onClick={handleClickOpen}
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    height: 70,
                                                    backgroundColor: theme.palette.secondary.main,
                                                    color: "#FFFFFF",
                                                    borderBottom: "1px solid #FFFFFF",
                                                    padding: "0 20px 0 20px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <Typography>{segment}</Typography>
                                                <Typography>FREE</Typography>
                                            </Box>
                                        )
                                    }
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{
                                backgroundColor: theme.palette.primary.main,
                                width: "50vw",
                                height: "calc(100vh - 70px)"
                            }}/>
                        </Grid>
                    </Grid>
                    <BookingForm open={open} onClose={handleClose}/>
                </Box>
            }
        </>
    )
}

export default Room;
