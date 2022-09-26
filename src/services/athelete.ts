import strava from "strava-v3";
import { config } from "dotenv";
import StravaInterface, { Shoes } from "../interfaces/stravaInterface";
import { LoggedInAthlete } from "../types/athlete";
import { Run } from "../types/activities/run";
import { Snowboarding } from "../types/activities/snowboarding";
import { VirtualRun } from "../types/activities/virtualRun";
import { Walk } from "../types/activities/walk";

config();
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

  allActivities: (Run | Snowboarding | VirtualRun | Walk)[] | undefined;

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
    this.athleteData = await this.stravaClient.athlete.get({
      id: this.client_id,
      access_token: this.stravaConfig.access_token,
    });
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
    return this.athleteData!.shoes.find(({ primary }) => primary == true);
  }

  distanceRanInShoes() {
    const shoes = this.athleteData!.shoes.find(
      ({ primary }) => primary === true
    );
    return shoes ? shoes.converted_distance : "N/A";
  }

  async generateActivitiesData() {
    try {
      this.allActivities = await this.stravaClient.athlete.listActivities({
        id: this.client_id,
        access_token: this.stravaConfig.access_token,
        per_page: 200,
      });
      this.runs = this.allActivities!.filter(({ type }) => type == "Run");
    } catch (e) {
      console.log("error");
      console.dir(e);
    }
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
