import React from "react";
import StatTable, { convertMetric } from './StatTable';
import Grid from '@mui/material/Grid';
import StatCard from "./StatCard";
import { gridSpacing } from "../services/constant";
import StravaInterface from '../interfaces/stravaInterface';

export default function Stats({athlete}: {athlete: StravaInterface}) {
  const runs = athlete.getFastestDistance(10000);
  const bestTime = convertMetric('moving_time', runs[0].moving_time)
  
  return (
    <>
      <Grid container spacing={gridSpacing} padding="1em">
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs>
              <StatTable name="Longest Runs" data={athlete.getLongestRun()} metric="distance" metricLabel="Distance" />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item sm={12} xs={12} md={12} lg={12}>
                    <StatCard label="10k time to beat" value={bestTime + ' mins'}/>
                </Grid>
                <Grid item sm={12} xs={12} md={12} lg={12}>
                    <StatCard label="Total Distance in current shoes" value={athlete.distanceRanInShoes() + ' km' }/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
            <StatTable name="Best 5k races" data={athlete.getFastestDistance(5000)} metric="moving_time" metricLabel="Time" />
        </Grid>
        <Grid item xs>
            <StatTable name="Best 10k races" data={runs} metric="moving_time" metricLabel="Time" />
        </Grid>
      </Grid>
    </>
  );
}