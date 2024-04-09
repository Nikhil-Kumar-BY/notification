// PaginationComponent.jsx
import React from 'react';
import { Pagination } from '@mui/material';

const PaginationComponent = ({ currentPage, paginate, notificationsPerPage, notificationsLength }) => {
    // Define paginationSize here
    let paginationSize = 'medium';
    if (Math.ceil(notificationsLength / notificationsPerPage) > 10) {
        paginationSize = 'small';
    }

    return (
        <Pagination
            count={Math.ceil(notificationsLength / notificationsPerPage)}
            page={currentPage}
            onChange={(event, value) => paginate(value)}
            color="primary"
            size={paginationSize}
            style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}
        />
    );
};



export default PaginationComponent;
