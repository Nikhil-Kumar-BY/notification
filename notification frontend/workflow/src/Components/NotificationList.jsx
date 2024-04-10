// NotificationList.jsx
import React from 'react';
import { List, Divider, ListItem,ListItemText } from '@mui/material';
import NotificationItem from './NotificationItem';

const NotificationList = ({ currentNotifications, handleNotificationClick }) => {
    return (
        <List>
            <ListItem>
                <ListItemText primary="Notifications" />
            </ListItem>
            <Divider />
            {currentNotifications.map((notification, index) => (
                <NotificationItem key={notification.userid} notification={notification} handleNotificationClick={handleNotificationClick} />
            ))}
        </List>
    );
};

export default NotificationList;
