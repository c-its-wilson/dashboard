import strava from "strava-v3";
import { config } from "dotenv";
import StravaInterface, { Shoes } from "../interfaces/stravaInterface";
import { LoggedInAthlete } from "../types/athlete";
import { Activities } from "../types/activities";
import { Run } from "../types/activities/run";
import sampleAthleteDate from "../samples/data.json";
import sampleActivities from "../samples/activities.json";

config();

const LOCAL = "DEV";
class StravaAthlete implements StravaInterface {
  client_id = process.env.REACT_APP_STRAVA_CLIENT_ID;

  hash = process.env.REACT_APP_HASH;

  stravaClient;

  stravaConfig = {
    redirect_uri: "",
    refresh_token: "",
    access_token: "",
    client_secret: "",
    client_id: "",
    token_type: "",
    expires_at: 0,
    expires_in: 0,
  };

  athleteData: LoggedInAthlete | undefined;

  stats: any | undefined;

  allActivities: Activities[] = [];

  runs: Run[] = [];

  constructor(clientID: string) {
    this.client_id = clientID;
    this.stravaClient = strava;
  }

  async initialise() {
    if (this.client_id == null) {
      throw new Error("Missing Credentials");
    }

    const hash = process.env.REACT_APP_HASH as string;

    try {
      const resp = await fetch(
        "/api/storage/GET?" +
          new URLSearchParams({
            key: hash,
            location: `${this.client_id}.jsonl`,
          })
      );
      this.stravaConfig = await resp.json();
    } catch (err) {
      console.log("Error", err);
      throw err;
    }

    this.stravaClient.config({
      client_id: this.client_id,
      client_secret: this.stravaConfig.client_secret!,
      redirect_uri: this.stravaConfig.redirect_uri,
      access_token: this.stravaConfig.access_token!,
    });

    if (Date.now() / 1000 > Number(this.stravaConfig.expires_at)) {
      const newStravaConfig = await strava.oauth.refreshToken(
        this.stravaConfig.refresh_token
      );
      this.stravaConfig = { ...this.stravaConfig, ...newStravaConfig };

      await fetch(
        "/api/storage/PUT?" +
          new URLSearchParams({
            key: hash,
            location: `${this.client_id}.jsonl`,
          }),
        {
          method: "PUT",
          body: JSON.stringify(this.stravaConfig),
        }
      );
    }

    if (process.env.REACT_APP_ENVIRONMENT === LOCAL) {
      this.athleteData = sampleAthleteDate;
    } else {
      this.athleteData = await this.stravaClient.athlete.get({
        id: this.client_id,
        access_token: this.stravaConfig.access_token,
      });
    }
  }

  getClientID(): string {
    return this.client_id!;
  }

  getBio(): string {
    return this.athleteData!.bio;
  }

  getStuff(): any {
    return this.athleteData;
  }

  getCurrentShoes(): Shoes | undefined {
    return this.athleteData!.shoes[0];
  }

  distanceRanInShoes() {
    const shoes = this.athleteData!.shoes[0];
    return shoes ? shoes.converted_distance.toString() : "N/A";
  }

  async generateActivitiesData() {
    if (process.env.REACT_APP_ENVIRONMENT) {
      this.allActivities = sampleActivities;
    } else {
      const MAX_ACTIVITIES = 300;
      const PAGE_SIZE = 75;
      const maxPageNum = Math.trunc(MAX_ACTIVITIES / PAGE_SIZE);
      const pages = [...Array(maxPageNum).keys()];

      const activitiesRequest = async (currentPage: number) => {
        try {
          return await this.stravaClient.athlete.listActivities({
            id: this.client_id,
            access_token: this.stravaConfig.access_token,
            per_page: PAGE_SIZE,
            page: currentPage,
          });
        } catch (e) {
          console.log("error");
          console.dir(e);
        }
      };

      const requestResults = await Promise.allSettled(
        pages.map((pageNum) => activitiesRequest(pageNum + 1))
      );
      requestResults.forEach((result) => {
        if (result.status == "fulfilled") {
          const activities = result.value as Activities[];
          this.allActivities.push(...activities);
        }
      });
    }
    this.runs = this.allActivities!.filter(({ type }) => type == "Run");
  }

  getAllRuns(): Run[] {
    return this.runs;
  }

  getLongestRun() {
    return this.runs
      .sort((prev, curr) => (prev.distance > curr.distance ? -1 : 1))
      .slice(0, 3);
  }

  runsAtDistance(distance: number, tolerance: number = 3): Run[] {
    const maxDistance = distance * (1 + tolerance / 100);
    const minDistance = distance * (1 - tolerance / 100);
    return this.runs.filter(
      ({ distance }) => distance > minDistance && distance < maxDistance
    );
  }

  getFastestRunsAtDistance(distance: number, numOfRunsToGet: number) {
    return this.runsAtDistance(distance)
      .sort((prev, curr) => (prev.moving_time < curr.moving_time ? -1 : 1))
      .slice(0, numOfRunsToGet);
  }
}

export default StravaAthlete;
