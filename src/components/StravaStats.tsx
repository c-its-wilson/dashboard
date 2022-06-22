import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Top3 from './TopStats';

export default function AutoGrid() {
  return (
    <Box sx={{ flexGrow: 1, padding: '2em' }}>
        <Paper style={{
            textAlign: 'center',
            lineHeight: '40px',
            borderRadius: 10,
          }}><h3>Top 3 Stats</h3>
        </Paper>
      <Grid container spacing={4}>
        <Grid item xs>
            <Top3 name="Fastest 1km" />
        </Grid>
        <Grid item xs={4}>
            {/* <Top3 name="Best 10km" /> */}
        </Grid>
        <Grid item xs>
            {/* <Top3 name="Furthest Run" endpoint="longestRun"/> */}
        </Grid>
      </Grid>
    </Box>
  );
}