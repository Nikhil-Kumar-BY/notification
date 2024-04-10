// NotificationItem.jsx
import React from 'react';
import { ListItem, ListItemIcon, Typography, Box, Grid } from '@mui/material';
import { Notifications } from '@mui/icons-material';

const NotificationItem = ({ notification, handleNotificationClick }) => {
    return (
        <ListItem button onClick={() => handleNotificationClick(notification.userid)} selected={!notification.read}
        sx={{marginTop:1}}
        >
            <ListItemIcon>
                <Notifications color={notification.read ? "disabled" : "secondary"} />
            </ListItemIcon>
            <Box>
                <Typography variant="subtitle1">{notification.sender}</Typography>
                <Typography variant="body2">
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item>Shift Timing: {`${notification.starttime} - ${notification.endtime}`}</Grid>
                    </Grid>
                    Assigned task: {notification.content}
                </Typography>
            </Box>
        </ListItem>
    );
};

export default NotificationItem;
