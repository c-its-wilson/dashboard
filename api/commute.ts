import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";
import { config } from "dotenv";

config();

type Metrolink = {
  Id: number;
  Line: string;
  TLAREF: string;
  PIDREF: string;
  StationLocation: string;
  AtcoCode: string;
  Direction: string;
  Dest0: string;
  Carriages0: string;
  Status0: string;
  Wait0: string;
  Dest1: string;
  Carriages1: string;
  Status1: string;
  Wait1: string;
  Dest2: string;
  Carriages2: string;
  Status2: string;
  Wait2: string;
  Dest3: string;
  Carriages3: string;
  Status3: string;
  MessageBoard: string;
  Wait3: string;
  LastUpdated: string;
};

const TIME_TO_WALK_EXS = 5;
const TIME_TO_WALK_SPS = 12;
const PGS_SPS_TRAVEL_TIME = 3;

export default async function trams(req: VercelRequest, resp: VercelResponse) {
  const { REACT_APP_TFGM_KEY } = process.env;
  if (REACT_APP_TFGM_KEY == null) {
    return resp.status(500);
  }

  const headers = { "Ocp-Apim-Subscription-Key": REACT_APP_TFGM_KEY };
  const tfgmResp = await fetch("https://api.tfgm.com/odata/Metrolinks", {
    headers,
  });
  const data = (await tfgmResp.json()).value as Metrolink[];

  const nearbyTrams = data
    .filter(
      ({ StationLocation }) =>
        StationLocation == "St Peter's Square" ||
        StationLocation == "Exchange Square" ||
        StationLocation == "Piccadilly Gardens"
    )
    .flatMap((platform) => [
      {
        stationName: platform.StationLocation,
        destination: platform.Dest0,
        size: platform.Carriages0,
        status: platform.Status0,
        wait: platform.Wait0,
      },
      {
        stationName: platform.StationLocation,
        destination: platform.Dest1,
        size: platform.Carriages1,
        status: platform.Status1,
        wait: platform.Wait1,
      },
      {
        stationName: platform.StationLocation,
        destination: platform.Dest2,
        size: platform.Carriages2,
        status: platform.Status2,
        wait: platform.Wait2,
      },
    ]);

  const nextEastDidsburyTram = nearbyTrams.find(
    ({ stationName, destination, status, wait }) =>
      stationName == "Exchange Square" &&
      destination == "East Didsbury" &&
      status == "Due" &&
      Number(wait) > TIME_TO_WALK_EXS
  );

  const nextMediaCityTram =
    nearbyTrams.find(
      ({ stationName, destination, status, wait }) =>
        stationName == "St Peter's Square" &&
        destination == "Eccles via MediaCityUK" &&
        status == "Due" &&
        Number(wait) > TIME_TO_WALK_SPS
    ) ??
    nearbyTrams.find(
      ({ stationName, destination, status }) =>
        stationName == "Piccadilly Gardens" &&
        destination == "Eccles via MediaCityUK" &&
        status == "Due"
    );

  let message = "";

  if (!nextEastDidsburyTram && !nextMediaCityTram) {
    message = "Unable to find any trams, please check again 😔";
  } else if (nextEastDidsburyTram && !nextMediaCityTram) {
    message = "No upcoming Media City trams coming to St Peter's";
  } else if (!nextEastDidsburyTram && nextMediaCityTram) {
    message = `No upcoming trams at Exchange Sq, head to St Peter's, the tram there is in ${nextMediaCityTram.wait} mins`;
  } else if (nextEastDidsburyTram && nextMediaCityTram) {
    if (nextMediaCityTram.stationName == "St Peter's Square") {
      if (Number(nextMediaCityTram.wait) < Number(nextEastDidsburyTram.wait)) {
        message = `Please head to St Peter's Sqare, the tram is in ${nextMediaCityTram.wait} mins 🤙`;
      } else {
        message = `Please head to Exchange Sq, the tram is in ${nextEastDidsburyTram.wait} mins 🤙`;
      }
    }
    if (nextMediaCityTram.stationName == "Piccadilly Gardens") {
      if (
        Number(nextMediaCityTram.wait) + PGS_SPS_TRAVEL_TIME <
        Number(nextEastDidsburyTram.wait)
      ) {
        message = `Please head to St Peter's Sqare, the tram is in ${nextMediaCityTram.wait} mins 🤙`;
      } else {
        message = `Please head to Exchange Sq, the tram is in ${nextEastDidsburyTram.wait} mins 🤙`;
      }
    }
  } else {
    message = "Unable to find trams, please check again 😔";
  }

  return resp.status(200).json(message);
}
