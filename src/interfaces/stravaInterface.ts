import { AuthenticationConfig, RefreshTokenResponse, Strava } from "strava-v3";
import { Run } from "../types/activities/run";
import { LoggedInAthlete } from "../types/athlete";

export type StravaConfig = AuthenticationConfig & RefreshTokenResponse

export default interface StravaInterface {
    readonly client_id: string | undefined;
    readonly stravaConfig: StravaConfig;
    readonly hash: string | undefined;
    stravaClient: Strava;
    athleteData: LoggedInAthlete | undefined;
    stats: any | undefined;
    activities: any | undefined;
    initialise: () => void;
    getBio: () => string;
    generateActivitiesData: () => Promise<void>;
    getLongestRun: () => Run[];
    getFastestDistance: (distance: number) => Run[];
    getCurrentShoes?: () => any[];
    distanceRanInShoes: () => number|string;
}