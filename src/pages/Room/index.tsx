import React, {useState, useEffect} from "react";
import { Grid, Box, Typography, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import DarkHeader from "../../components/DarkHeader";
import theme from "../../style/theme";
import BookingForm from "../../components/BookingForm";
import { fetchGetRoom } from "../../redux/Room/actions";

const timeSegments: Array<string> = [
    "08:00-10:00",
    "10:00-12:00",
    "12:00-17:00",
    "17:00-22:00"
]
const Room: React.FC = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        dispatch(fetchGetRoom("3d83abe8-245b-4765-aa2b-22f6e6b43785"));
    }, []);

    return (
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
                            }}>Meeting Room Seattle</Typography>
                            <Typography>Number of seats: 10</Typography>
                            <Typography>Location: 3rd floor, west corridor</Typography>
                            <Typography>Equipment: TV, Projector</Typography>
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
                                        onClick={handleClickOpen}
                                        key={segment}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            height: 70,
                                            backgroundColor: theme.palette.primary.main,
                                            color: "#FFFFFF",
                                            borderBottom: "1px solid #FFFFFF",
                                            padding: "0 20px 0 20px",
                                            cursor: "pointer"
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
                        backgroundColor: "#F8BF4C",
                        width: "50vw",
                        height: "calc(100vh - 70px)"
                        }}
                    />
                </Grid>
            </Grid>
            <BookingForm open={open} onClose={handleClose}/>
        </Box>
    )
}

export default Room;
