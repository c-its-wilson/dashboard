import { AuthenticationConfig, RefreshTokenResponse, Strava } from "strava-v3";
import { LoggedInAthlete } from "../types/athlete";

export type StravaConfig = AuthenticationConfig & RefreshTokenResponse

export default interface StravaInterface {
    readonly client_id: string | undefined;
    readonly stravaConfig: StravaConfig;
    readonly hash: string | undefined;
    stravaClient: Strava;
    myData: LoggedInAthlete | undefined;
    initialise: () => void;
    getBio: () => string;
    getLongestRun?: () => any;
    getFastest10K?: () => any;
    getCurrentShoes?: () => any[];
}