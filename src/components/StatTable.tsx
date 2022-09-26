import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import { Run } from "../types/activities/run";
import { convertMetric } from "../helpers/converters";

const StatTable = ({
  name,
  data,
  metric,
  metricLabel,
}: {
  name: string;
  data: Run[];
  metric: keyof Run;
  metricLabel?: string;
}) => {
  const label = metricLabel ? metricLabel : metric;

  return (
    <>
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
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">{label}</TableCell>
                <TableCell align="center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((run) => {
                const convertedMetric = convertMetric(metric, run[metric]);
                return (
                  <TableRow key={run.name}>
                    <TableCell component="th" scope="row">
                      {run.name}
                    </TableCell>
                    <TableCell align="center">{convertedMetric}</TableCell>
                    <TableCell align="center">
                      {run.start_date.split("T")[0]}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default StatTable;
