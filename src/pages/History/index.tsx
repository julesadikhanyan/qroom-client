import React from "react";
import {Typography} from "@mui/material";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchGetHistory} from "../../redux/User/actions";

const History = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const authenticateToken = localStorage.getItem("authenticateToken");
        const id = localStorage.getItem("id");
        authenticateToken && id && dispatch(fetchGetHistory(authenticateToken, id));
    }, []);

    return (
        <Typography>History</Typography>
    )
};

export default History;