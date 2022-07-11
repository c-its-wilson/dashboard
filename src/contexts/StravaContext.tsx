import React, { FC, useState, createContext, PropsWithChildren, useEffect } from 'react';
import StravaInterface from '../interfaces/stravaInterface';
import StravaAthlete from '../services/athelete';

type StravaContext = {
  hasInitialised: boolean;
  currAthlete: StravaInterface | undefined;
  initialiseStrava: () => void;
};

type AthleteID = { clientId: string }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const StravaContext = createContext<StravaContext>(
  {} as StravaContext
);

export const StravaProvider: FC<AthleteID & PropsWithChildren> = ({ clientId, children }) => {
  const [currAthlete, setCurrAthlete] = useState<StravaInterface | undefined>(undefined)

  const initialiseStrava = () => {
    if (!currAthlete) {
      useEffect(() => {
        const athlete = new StravaAthlete(clientId)
        const intitialise = async () => {
          await athlete.initialise();
          await athlete.generateActivitiesData()
          setCurrAthlete(athlete)
        }
        intitialise();
      }, [])
    } else {
      throw new Error("Strava Atlhete data has already been fetched")
    }
  }

  const hasInitialised = !!currAthlete;

  return (
    <StravaContext.Provider
      value={{ hasInitialised, currAthlete, initialiseStrava }}
    >
      {children}
    </StravaContext.Provider>
  );
};
