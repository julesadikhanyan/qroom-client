import React from "react";
import {Typography} from "@mui/material";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchGetHistory} from "../../redux/User/actions";
import Loading from "../../components/Loading";
import {RootState} from "../../redux/store";

const History = () => {
    const dispatch = useDispatch();

    const loading = useSelector<RootState, boolean>((state) => state.userReducer.historyLoading);

    useEffect(() => {
        const authenticateToken = localStorage.getItem("authenticateToken");
        const id = localStorage.getItem("id");
        authenticateToken && id && dispatch(fetchGetHistory(authenticateToken, id));
    }, []);

    if (loading) {
        return <Loading/>
    }

    return (
        <Typography>History</Typography>
    )
};

export default History;