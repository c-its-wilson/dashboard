import strava from 'strava-v3';
import { config } from 'dotenv';
import StravaInterface from '../interfaces/stravaInterface';
import { LoggedInAthlete } from '../types/athlete';

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
    
    myData: LoggedInAthlete | undefined;

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
            // updatwAwsObject('config.jsonl', JSON.stringify(this.stravaConfig));

            await fetch('/api/storage/PUT?' + new URLSearchParams({
                key: hash,
                location: 'config.jsonl'
            }), {
                method: 'PUT',
                body: JSON.stringify(this.stravaConfig)
            })
        }

        this.myData = await this.stravaClient.athlete.get({id: this.client_id, access_token: this.stravaConfig.access_token}) as LoggedInAthlete
    }

    getBio (): string {
        return this.myData!.bio
    }

    getStuff (): any {
        return this.myData
    }

    getCurrentShoes(): any {
        return this.myData!.shoes.find(({primary}) => primary == true)
    }
}

export default StravaAthlete