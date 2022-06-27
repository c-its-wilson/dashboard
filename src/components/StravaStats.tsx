import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import StatTable from './TopStats';
import StravaInterface from '../interfaces/stravaInterface';

export default function Stats({athlete}: {athlete: StravaInterface}) {
  return (
    <Box sx={{ flexGrow: 1, padding: '1em' }}>
        <Paper style={{
            textAlign: 'center',
            lineHeight: '40px',
            borderRadius: 10,
          }}><h3>Top 3 Stats</h3>
        </Paper>
      <Grid container spacing={4}>
        <Grid item xs>
            <StatTable name="Fastest Average Speed" data={athlete.getHighestAverageSpeed()} metric="average_speed" metricLabel="Average Speed (Km/h)" />
        </Grid>
        <Grid item xs>
            <StatTable name="Fastest Max Speeds" data={athlete.getMaxSpeed()} metric="max_speed" metricLabel="Max Speed (Km/h)" />
        </Grid>
        <Grid item xs>
            <StatTable name="Best 10km" data={athlete.getFastest10K()} metric="moving_time" metricLabel="Time" />
        </Grid>
        <Grid item xs>
            <StatTable name="Longest Runs" data={athlete.getLongestRun()} metric="distance" metricLabel="Distance" />
        </Grid>
      </Grid>
    </Box>
  );
}