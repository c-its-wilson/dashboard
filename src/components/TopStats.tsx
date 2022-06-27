import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Run } from "../types/activities/run";

const StatTable = ({name, data, metric, metricLabel}: {name: string, data: Run[], metric: keyof Run, metricLabel?: string}) => {
    const label = metricLabel ? metricLabel : metric
    
    return (
        <>
            <Paper style={{
                textAlign: 'center',
                padding: 1,
                borderRadius: 10,
            }}>
                <h3>{name}</h3>
                <Divider variant="fullWidth" />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="medium" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">{label}</TableCell>
                                <TableCell align="center">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((run) => {
                            const convertedMetric = convertMetric(metric, run[metric])
                            return(
                                <TableRow
                                    key={run.name}
                              
                                >
                                    <TableCell component="th" scope="row">{run.name}</TableCell>
                                    <TableCell align="center">{convertedMetric}</TableCell>
                                    <TableCell align="center">{run.start_date.split('T')[0]}</TableCell>
                                </TableRow>
                        )})}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    )
}

const convertMetric = (param: string, value: any) => {
    try {
        if (param.includes('time') && typeof value == "number") {
            // Strava saves time in seconds, convert to readble format
            const mins = Math.floor(value / 60);
            const secs = value % 60;
            return `${padTo2Digits(mins)}:${padTo2Digits(secs)}`;
        } else if (param == 'distance') {
            return (Number(value) / 1000).toFixed(2)
        } else if (param.includes('speed')) {
            // in m/s, convert to km/h
            return (Number(value) * 60 * 60 / 1000).toFixed(2);
        } else {
            throw new Error(`Error, unable to convert param ${param} with the value of ${value}`);
        }
    } catch (e) {
        throw new Error(`Error, unable to convert param ${param} with the value of ${value}`);
    }

}

const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
  }

export default StatTable;