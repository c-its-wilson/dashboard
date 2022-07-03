import React from 'react'
import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import posts from '../services/blogPosts'

// project imports
import SubCard from '../components/SubCard';
import MainCard from '../components/MainCard';
import { gridSpacing } from '../services/constant';

// ==============================|| TYPOGRAPHY ||============================== //

const Blog = () => (
    <MainCard title="Blog">
        <Grid container spacing={gridSpacing}>
            {posts.map(({date, post}) => (
                <Grid item xs={12}>
                    <SubCard title={date}>
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MuiTypography variant="body1" gutterBottom>
                                    {post}
                                </MuiTypography>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            ))}
        </Grid>
    </MainCard>
);

export default Blog;
