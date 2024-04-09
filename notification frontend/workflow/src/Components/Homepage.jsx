// Homepage.jsx
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Paper, Grid, Button, Drawer,Typography } from '@mui/material';
import { styled } from '@mui/system';
import Navbar from './Navbar';
import NotificationList from './NotificationList';
import PaginationComponent from './PaginationComponent';
import Swal from 'sweetalert2';


const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2196f3', // Blue color
        },
        secondary: {
            main: '#f50057', // Pink color
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2196f3', // Blue color
        },
        secondary: {
            main: '#f50057', // Pink color
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

const Homepage = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPerPage = 5; // Limit notifications per page
    const [notifications, setNotifications] = useState([
        { userid: 1, sender: "John Doe", content: "Complete report", starttime: "9:00 AM", endtime: "5:00 PM", status: "shift assigned", read: false },
        { userid: 2, sender: "Alice Smith", content: "Attend meeting", starttime: "10:30 AM", endtime: "2:30 PM", status: "shift rejected", read: false },
        { userid: 3, sender: "Bob Johnson", content: "Review code", starttime: "1:00 PM", endtime: "6:00 PM", status: "shift approved", read: false }
    ]);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    useEffect(() => {
        const userid = localStorage.getItem("userid");
        const eventSource = new EventSource("http://localhost:8081/api/getmessages/" + userid);

        eventSource.onmessage = (event) => {
            const stockData = JSON.parse(event.data);
            
            console.log(stockData)
            setNotifications(notifications=>[{...stockData,userid:notifications.length+1,read:false},...notifications])
            handleTestNotification();
            console.log(notifications)
        };

        return () => eventSource.close();
    }, []);

    const [currentTheme, setCurrentTheme] = useState('light');

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const toggleTheme = () => {
        setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    };

    const handleNotificationClick = (notificationId) => {
        setNotifications(prevNotifications => 
            prevNotifications.map(notification => 
                notification.id === notificationId ? { ...notification, read: true } : notification
            )
        );
    };
    

    const handleMarkAllAsRead = () => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                ({ ...notification, read: true })
            )
        );
    };

    const handleNotificationScroll = (event) => {
        const drawerContent = event.target;
        const notificationsInView = Math.floor(drawerContent.clientHeight / 72); // 72px is the height of each notification item

        setNotifications(prevNotifications =>
            prevNotifications.map((notification, index) =>
                index < notificationsInView ? { ...notification, read: true } : notification
            )
        );
    };

    const unreadNotificationCount = notifications.filter(notification => !notification.read).length;

    const handleTestNotification = () => {
        
        // const newNotification = {
        //     id: notifications.length + 1,
        //     userName: "New User",
        //     task: "New Task",
        //     startTime: "Now",
        //     endTime: "Soon",
        //     status: "shift assigned", // Default status for new notifications
        //     read: false
        // };
        // setNotifications(prevNotifications => [newNotification, ...prevNotifications]);

        Swal.fire({
            title: 'New Notification!',
            text: 'You have received a new notification!',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
                title: 'swal-title',
                content: 'swal-text',
                popup: 'swal-popup',
            },
            showCloseButton: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            position: 'top',
            toast: true,
        });
    };

    // Pagination logic
    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);

    // Calculate pagination size based on number of pages
    let paginationSize = 'medium';
    if (Math.ceil(notifications.length / notificationsPerPage) > 10) {
        paginationSize = 'small';
    }

    return (
        <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <Grid container direction="column" justifyContent="space-between" style={{ minHeight: '100vh' }}>
                <Grid item>
                    <Navbar toggleDrawer={toggleDrawer} toggleTheme={toggleTheme} unreadNotificationCount={unreadNotificationCount} currentTheme={currentTheme} />
                    <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                        <div style={{ width: 300 }} onScroll={handleNotificationScroll}>
                            <NotificationList currentNotifications={currentNotifications} handleNotificationClick={handleNotificationClick} />
                        </div>
                        <PaginationComponent currentPage={currentPage} paginate={paginate} notificationsPerPage={notificationsPerPage} notificationsLength={notifications.length} />
                    </Drawer>
                </Grid>
                <Grid item>
                    <Paper style={{ margin: '20px', padding: '20px', background: currentTheme === 'light' ? '#fff' : '#333', borderRadius: 8 }}>
                        <Typography variant="body1" style={{ color: currentTheme === 'light' ? '#333' : '#eee' }}>
                            Welcome to the Homepage! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis odio eu urna vestibulum dignissim.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleTestNotification}>
                        Test New Notification
                    </Button>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Homepage;
