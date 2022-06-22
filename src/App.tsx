import './App.css';
import React, { useEffect, useState } from 'react';
import Bio from './components/Bio';
import Footer from './components/Footer';
import StravaStats from './components/StravaStats';
import { config } from 'dotenv';
import StravaAthlete from './services/athelete'
import StravaInterface from './interfaces/stravaInterface';

config()

function App() {
  const client_id = process.env.REACT_APP_STRAVA_CLIENT_ID;
  const [currAthlete, setCurrAthlete] = useState<StravaInterface | undefined>(undefined)
  if (client_id == null) {
    throw new Error("Missing Credentials");
  }

  useEffect(() => {
    const athlete = new StravaAthlete(client_id)
    const intitialise = async () => {
      await athlete.initialise()
      setCurrAthlete(athlete)
   }
   intitialise();
  }, [])

  return (
    <div className="App">
      <header className='App-header' >
        <h1>My Strava Dashboard</h1>
      </header>
      <body>
        <>
          {!currAthlete ? 'Loading' : <Bio bio={currAthlete.getBio()} />}
          {/* <StravaStats/> */} 
        </>
      </body>
      <Footer/>
    </div>
  );
}

export default App;
