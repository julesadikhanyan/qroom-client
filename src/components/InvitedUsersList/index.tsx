import React from "react";
import {IInvitedUsers} from "../../redux/Room/types";
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import theme from "../../style/theme";
import {ISystemUser} from "../../redux/User/types";

export interface IInvitedUsersListProps {
    users: IInvitedUsers,
    systemUsers: ISystemUser[]

}
const InvitedUsersList: React.FC<IInvitedUsersListProps> = (props) => {
    const { users, systemUsers } = props;

    let usersDictionary: {[key: string]: ISystemUser} = {};
    systemUsers.forEach((user:ISystemUser) => {
        console.log(user);
        usersDictionary[user.id] = user;
    })

    console.log(usersDictionary);

    return (
        <>
            {
                (systemUsers.length > 0) &&
                <Box sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: "300px" }}>
                    <List>
                        {
                            Object.keys(users).map((key: string) =>
                                <ListItem key={key} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            { users[key] === "CONFIRMED" && <CircleIcon sx={{ color: theme.palette.success.main }}/> }
                                            { users[key] === "PENDING" && <CircleIcon sx={{ color: theme.palette.secondary.main }}/> }
                                            { users[key] === "REJECTED" && <CircleIcon sx={{ color: theme.palette.warning.main }}/> }
                                        </ListItemIcon>
                                        <ListItemText primary={`${usersDictionary[key].login} - ${usersDictionary[key].name}`} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        }
                    </List>
                </Box>
            }
        </>


    )
};

export default InvitedUsersList;
