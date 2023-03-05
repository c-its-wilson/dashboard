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
        StationLocation == "Exchange Square"
    )
    .map((platform) => ({
      id: platform.Id,
      stationName: platform.StationLocation,
      trams: [
        {
          destination: platform.Dest0,
          size: platform.Carriages0,
          status: platform.Status0,
          wait: platform.Wait0,
        },
        {
          destination: platform.Dest1,
          size: platform.Carriages1,
          status: platform.Status1,
          wait: platform.Wait1,
        },
        {
          destination: platform.Dest2,
          size: platform.Carriages2,
          status: platform.Status2,
          wait: platform.Wait2,
        },
      ],
      message: platform.MessageBoard,
    }));

  const nextExchangeSqTram =
    nearbyTrams.find((station) => {
      station.stationName == "Exchange Square" &&
        station.trams.some(
          ({ destination, status }) =>
            destination == "East Didsbury" && status == "Due"
        );
    }) ?? "No Tram Avaiable";

  const nextStPetersTram =
    nearbyTrams.find((station) => {
      station.stationName == "St Peter's Square" &&
        station.trams.some(
          ({ destination, status }) =>
            destination == "Eccles via MediaCityUK" && status == "Due"
        );
    }) ?? "No Tram Avaiable";

  const respBody = {
    nextExchangeSqTram,
    nextStPetersTram,
  };

  return resp.status(200).json(respBody);
}
