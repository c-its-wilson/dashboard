import React from 'react'
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import MainCard from './MainCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary.light,
        borderRadius: '50%',
        top: -110,
        right: -125,
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary.light,
        borderRadius: '50%',
        top: -150,
        right: -50,
        opacity: 0.5,
    }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const StatCard = ({label, value}: {label: string, value: string|number}) => {
    const theme = useTheme();

    return (
        <CardWrapper border={false} content={false}>
            <Box sx={{ p: 2 }}>
                {/* <Grid container direction="column"> */}
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mr: 1, mt: 0.5, mb: 0.5 }}>{value}</Typography>
                    <Typography
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: theme.palette.secondary.contrastText,
                            // backgroundColor: theme.palette.background.default,
                        }}
                    >
                        {label}
                    </Typography>
                {/* </Grid> */}
            </Box>
        </CardWrapper>
    );
};

StatCard.propTypes = {
    isLoading: PropTypes.bool
};

export default StatCard;
