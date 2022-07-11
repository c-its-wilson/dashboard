import React, { useContext } from 'react';
import MainCard from '../components/MainCard';
import StravaStats from '../components/StravaStats';
import SuspenseLoader from '../components/SuspenceLoader';
import { StravaContext } from '../contexts/StravaContext';


export default () => {
  const { currAthlete, initialiseStrava } = useContext(StravaContext);
  if (!currAthlete) (
    initialiseStrava()
  )

  return (
    <>
      { !currAthlete 
        ? <SuspenseLoader />
        : <>
          <MainCard title={currAthlete.getBio()}>
            <StravaStats athlete={currAthlete} />
          </MainCard>
        </>
      }
    </>
  )
}