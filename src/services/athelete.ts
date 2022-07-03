import strava from 'strava-v3';
import { config } from 'dotenv';
import StravaInterface from '../interfaces/stravaInterface';
import { LoggedInAthlete } from '../types/athlete';
import { Run } from '../types/activities/run'

config();

class StravaAthlete implements StravaInterface {

    client_id = process.env.STRAVA_CLIENT_ID;

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
        expires_in: 0
    };
    
    athleteData: LoggedInAthlete | undefined;

    stats: any | undefined;

    activities: Run[] | undefined;

    constructor(clientID: string) {
        this.client_id = clientID;
        this.stravaClient = strava;
    }

    getClient() {
        return this.client_id;
    }

    async initialise() {
        if (this.client_id == null) {
            throw new Error("Missing Credentials");
        }

        const hash = process.env.REACT_APP_HASH as string

        try {
            const resp = await fetch('/api/storage/GET?' + new URLSearchParams({
                key: hash,
                location: 'config.jsonl'
            }))
            this.stravaConfig = await resp.json()
        } catch (err) {
            console.log("Error", err);
            throw err;
        }

        this.stravaClient.config({
            client_id: this.client_id,
            client_secret: this.stravaConfig.client_secret!,
            redirect_uri: this.stravaConfig.redirect_uri,
            access_token: this.stravaConfig.access_token!,
        })

        if ((Date.now()/1000) > Number(this.stravaConfig.expires_at)) {
            const newStravaConfig = await strava.oauth.refreshToken(this.stravaConfig.refresh_token)
            this.stravaConfig = {...this.stravaConfig, ...newStravaConfig}
        
            await fetch('/api/storage/PUT?' + new URLSearchParams({
                key: hash,
                location: 'config.jsonl'
            }), {
                method: 'PUT',
                body: JSON.stringify(this.stravaConfig)
            })
        }
        this.athleteData = await this.stravaClient.athlete.get({id: this.client_id, access_token: this.stravaConfig.access_token});
    }

    getBio (): string {
        return this.athleteData!.bio
    }

    getStuff (): any {
        return this.athleteData
    }

    getCurrentShoes(): any {
        return this.athleteData!.shoes.find(({primary}) => primary == true)
    }

    async generateActivitiesData() {
        try {
            this.activities = await this.stravaClient.athlete.listActivities({id: this.client_id, access_token: this.stravaConfig.access_token, per_page: 200});
        } catch(e) {
            console.log('error')
            console.dir(e)
        }
    }

    getFastestDistance(distance: number) {
        const ACCURACY = 3;
        const maxDistance = distance * (1 + (ACCURACY / 100))
        const minDistance = distance * (1 - (ACCURACY / 100))
        return this.activities!.filter(({type}) => type == 'Run').filter(({distance}) => ((distance > minDistance) && (distance < maxDistance)))
            .sort((prev, curr) => (prev.moving_time < curr.moving_time) ? -1 : 1).slice(0, 3)
    }

    getLongestRun() {
        return this.activities!.filter(({type}) => type == 'Run').sort((prev, curr) => (prev.distance > curr.distance) ? -1 : 1).slice(0,3)
    }

    getHighestAverageSpeed() {
        return this.activities!.filter(({type}) => type == 'Run').sort((prev, curr) => (prev.average_speed > curr.average_speed) ? -1 : 1).slice(0,3)
    }

    getMaxSpeed() {
        return this.activities!.filter(({type}) => type == 'Run').sort((prev, curr) => (prev.max_speed > curr.max_speed) ? -1 : 1).slice(0,3)
    }
}

export default StravaAthlete