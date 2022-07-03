import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import StatTable from './StatTable';
import StravaInterface from '../interfaces/stravaInterface';

export default function Stats({athlete}: {athlete: StravaInterface}) {
  return (
    <>
    {/* <Box sx={{ flexGrow: 1, padding: '1em' }}> */}
      <Grid container spacing={2} padding="1em">
        <Grid item xs>
            <StatTable name="Best 10k races" data={athlete.getFastestDistance(10000)} metric="moving_time" metricLabel="Time" />
        </Grid>
        <Grid item xs>
            <StatTable name="Best 5k races" data={athlete.getFastestDistance(5000)} metric="moving_time" metricLabel="Time" />
        </Grid>
        <Grid item xs>
            <StatTable name="Longest Runs" data={athlete.getLongestRun()} metric="distance" metricLabel="Distance" />
        </Grid>
      </Grid>
      {/* {console.log(athlete.stats)} */}
    {/* </Box> */}
    </>
  );
}