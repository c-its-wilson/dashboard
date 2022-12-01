import React from "react";
import StatTable from "./StatTable";
import Grid from "@mui/material/Grid";
import StatCard from "./StatCard";
import { gridSpacing } from "../services/constant";
import StravaInterface from "../interfaces/stravaInterface";
import Histogram, { generateHistogramData } from "./ChartWidget";
import { convertMetric } from "../helpers/converters";

export default function Stats({ athlete }: { athlete: StravaInterface }) {
  const best10KmRuns = athlete.getFastestRunsAtDistance(10000, 3);
  const bestRaceTime = best10KmRuns
    ? convertMetric("moving_time", best10KmRuns[0].moving_time)
    : "N/A";

  const runs = athlete.getAllRuns();
  const runs5Km = athlete.runsAtDistance(5000, 10);

  return (
    <>
      <Grid container spacing={gridSpacing} padding="1em">
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs>
              <StatTable
                name="Longest Runs"
                data={athlete.getLongestRun()}
                metric="distance"
                metricLabel="Distance"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={12} lg={12}>
                  <StatCard
                    label="Ran in shoes"
                    value={athlete.distanceRanInShoes() + " km"}
                  />
                </Grid>
                <Grid item xs={6} sm={4} md={6} lg={6}>
                  <StatCard
                    label="10k time to beat"
                    value={best10KmRuns ? bestRaceTime : "N/A"}
                  />
                </Grid>
                <Grid item xs={6} sm={4} md={6} lg={6}>
                  <StatCard
                    label="Total No. of Runs"
                    value={athlete.getAllRuns().length}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <StatTable
            name="Best 5k races"
            data={athlete.getFastestRunsAtDistance(5000, 3)}
            metric="moving_time"
            metricLabel="Time"
          />
        </Grid>
        <Grid item xs>
          <StatTable
            name="Best 10k races"
            data={best10KmRuns}
            metric="moving_time"
            metricLabel="Time"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Histogram
            name="5km Run Distribution"
            data={generateHistogramData(runs5Km, "moving_time", 30, 1200, 2100)}
            dataLabel="Number of Runs"
            metric="moving_time"
            xAxisLabel="Time"
            yAxisLabel="Number of Runs"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Histogram
            name="Run Duration Distribution"
            data={generateHistogramData(runs, "moving_time", 60)}
            dataLabel="Number of Runs"
            metric="moving_time"
            xAxisLabel="Time"
            yAxisLabel="Number of Runs"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Histogram
            name="Pace Distribution"
            data={generateHistogramData(runs, "average_speed", 0.25, 2, 4.5)}
            dataLabel="Number of Runs"
            metric="average_speed"
            xAxisLabel="Avg. Pace (mins / km)"
            yAxisLabel="Number of Runs"
            xAxisReverse={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Histogram
            name="Run distance Distribution"
            data={generateHistogramData(runs, "distance", 500, 0, 25000)}
            dataLabel="Number of Runs"
            metric="distance"
            xAxisLabel="Distance (m)"
            yAxisLabel="Number of Runs"
          />
        </Grid>
      </Grid>
    </>
  );
}
