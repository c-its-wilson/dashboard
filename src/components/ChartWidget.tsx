import React from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { HistogramData } from "../interfaces/stravaInterface";
import { Bar } from "react-chartjs-2";
import { Run } from "../types/activities/run";
import { convertMetric } from "../helpers/converters";

const Histogram = ({
  name,
  data,
  dataLabel,
  metric,
  xAxisLabel,
  yAxisLabel,
  xAxisReverse,
}: {
  name: string;
  data: HistogramData[];
  dataLabel: string;
  metric: string;
  xAxisLabel: string;
  yAxisLabel: string;
  xAxisReverse?: boolean;
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const chartOptions = {
    responsive: true,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
      x: {
        title: {
          display: true,
          text: xAxisLabel,
        },
        reverse: xAxisReverse,
      },
    },
  };

  let labels: string[] = [];
  let runCount: number[] = [];
  data.forEach((data, index) => {
    labels[index] = convertMetric(metric, data.bucketValue);
    runCount[index] = data.count;
  });
  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: dataLabel,
        data: runCount,
        borderColor: "rgb(90, 104, 246)",
        backgroundColor: "rgba(139, 150, 248)",
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };

  return (
    <Paper
      style={{
        textAlign: "center",
        borderRadius: 10,
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} size="medium" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                <span style={{ fontWeight: "bolder", fontSize: "0.95rem" }}>
                  {name}
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Bar options={chartOptions} data={chartData} />
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export function generateHistogramData(
  activities: Run[],
  param: keyof Run,
  bucketSize: number,
  minBucket: number = 0,
  maxBucket: number = 3600
): HistogramData[] {
  let histogramData: HistogramData[] = [];
  const numOfBuckets = Math.ceil((maxBucket - minBucket) / bucketSize);
  for (let bucketNum = 0; bucketNum <= numOfBuckets; bucketNum++) {
    const bucket = {
      bucketValue: minBucket + bucketSize * bucketNum,
      count: 0,
    };
    histogramData[bucketNum] = bucket;
  }

  activities.forEach((activity) => {
    let value = activity[param];
    if (typeof value !== "number") {
      throw new Error(
        `Cannot compare the ${param} value of this activity, please pick another param`
      );
    }

    for (let i = 0; i < histogramData.length; i++) {
      if (value < histogramData[i].bucketValue) {
        if (i == 0) continue; //Disregard value
        histogramData[i - 1].count++;
        break;
      }
    }
  });

  return histogramData;
}

export default Histogram;
