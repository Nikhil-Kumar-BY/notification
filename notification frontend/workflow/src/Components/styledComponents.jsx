// styledComponents.js
import { styled } from '@mui/system';
import { ListItem } from '@mui/material';
import {Typography} from '@mui/material';

export const StyledListItem = styled(ListItem)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#f0f0f0' : '#424242',
    borderRadius: '8px',
    marginBottom: '8px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#e0e0e0' : '#5f5f5f',
    },
}));

export const NotificationText = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#333' : '#eee',
}));

export const NotificationSecondaryText = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#666' : '#ccc',
}));
