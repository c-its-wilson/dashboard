import { AuthenticationConfig, RefreshTokenResponse, Strava } from "strava-v3";
import { Run } from "../types/activities/run";
import { LoggedInAthlete } from "../types/athlete";

export type StravaConfig = AuthenticationConfig & RefreshTokenResponse;
export type Shoes = LoggedInAthlete["shoes"][0];
export type HistogramData = {
  bucketValue: number;
  count: number;
};
export default interface StravaInterface {
  readonly client_id: string | undefined;
  readonly stravaConfig: StravaConfig;
  readonly hash: string | undefined;
  stravaClient: Strava;
  athleteData: LoggedInAthlete | undefined;
  stats: any | undefined;
  allActivities: any | undefined;
  initialise: () => void;
  getClientID: () => string;
  getBio: () => string;
  getCurrentShoes?: () => Shoes | undefined;
  distanceRanInShoes: () => number | string;
  generateActivitiesData: () => Promise<void>;
  getAllRuns: () => Run[];
  getLongestRun: () => Run[];
  runsAtDistance: (distance: number, tolerance?: number) => Run[];
  getFastestRunsAtDistance: (distance: number, numOfRunsToGet: number) => Run[];
}
