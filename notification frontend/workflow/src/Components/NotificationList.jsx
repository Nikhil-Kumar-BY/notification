// NotificationList.jsx
import React from 'react';
import { List, ListItem, Divider, Typography, ListItemText, ListItemIcon, Box, Grid } from '@mui/material';
import { Zoom } from '@mui/material';
import { StyledListItem, NotificationText, NotificationSecondaryText } from './styledComponents';
import { Notifications } from '@mui/icons-material';

const NotificationList = ({ currentNotifications, handleNotificationClick }) => {
    return (
        <List>
            <ListItem>
                <ListItemText primary="Notifications" />
            </ListItem>
            <Divider />
            {currentNotifications.map((notification, index) => (
                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={notification.userid}>
                    <StyledListItem button onClick={() => handleNotificationClick(notification.userid)} selected={!notification.read}>
                        <ListItemIcon>
                            <Notifications color={notification.read ? "disabled" : "secondary"} />
                        </ListItemIcon>
                        <Box>
                            <NotificationText variant="subtitle1">{notification.sender}</NotificationText>
                            <NotificationSecondaryText variant="body2">
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item>
                                        Shift Timing: {`${notification.starttime} - ${notification.endtime}`}
                                    </Grid>
                                </Grid>
                                Assigned task: {notification.content}
                            </NotificationSecondaryText>
                        </Box>
                    </StyledListItem>
                </Zoom>
            ))}
        </List>
    );
};

export default NotificationList;
