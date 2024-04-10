// DrawerComponent.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton, Typography } from '@mui/material';
import Pagination from './PaginationComponent';
import NotificationList from './NotificationList';

const DrawerComponent = ({ isDrawerOpen, setIsDrawerOpen, handleMarkAllAsRead, handleNotificationScroll, notifications, currentPage, paginate, notificationsPerPage }) => {
    return (
        <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <div style={{ width: 300 }} onScroll={handleNotificationScroll}>
                <List>
                    <ListItem>
                        <ListItemText primary="Notifications" />
                        <IconButton edge="end" onClick={handleMarkAllAsRead}>
                            <Typography variant="body2">Mark All as Read</Typography>
                        </IconButton>
                    </ListItem>
                    <Divider />
                    <NotificationList currentNotifications={notifications} handleNotificationClick={() => {}} />
                </List>
            </div>
            <Pagination
                count={Math.ceil(notifications.length / notificationsPerPage)}
                page={currentPage}
                onChange={(event, value) => paginate(value)}
            />
        </Drawer>
    );
};

export default DrawerComponent;
