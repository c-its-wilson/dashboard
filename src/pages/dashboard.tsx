import { Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MainCard from '../components/MainCard';
import StatTable from '../components/StatTable';
import StravaStats from '../components/StravaStats';
import SuspenseLoader from '../components/SuspenceLoader';
import StravaInterface from '../interfaces/stravaInterface';
import StravaAthlete from '../services/athelete';


export default () => {
    const client_id = process.env.REACT_APP_STRAVA_CLIENT_ID;
    const [currAthlete, setCurrAthlete] = useState<StravaInterface | undefined>(undefined)
    if (client_id == null) {
      throw new Error("Missing Credentials");
    }
  
    useEffect(() => {
      const athlete = new StravaAthlete(client_id)
      const intitialise = async () => {
        await athlete.initialise();
        await athlete.generateActivitiesData()
        setCurrAthlete(athlete)
      }
      intitialise();
    }, [])
    
    return (
        <MainCard title="Dashboard">
            { !currAthlete 
                ? <SuspenseLoader />
                : <>
                    <Paper style={{
                        textAlign: 'center',
                        lineHeight: '40px',
                        borderRadius: 10,
                    }}><h3>{currAthlete.getBio()}</h3>
                    </Paper>
                    <StravaStats athlete={currAthlete} />
                </>
            }
        </MainCard>
    )
}