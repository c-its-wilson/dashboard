import { default as strava, Strava, RefreshTokenResponse, AuthenticationConfig } from 'strava-v3';
import { getAwsObject, updatwAwsObject } from './_aws';
import { config } from 'dotenv';

config();

type StravaConfig = AuthenticationConfig & RefreshTokenResponse

let stravaConfig: StravaConfig = {
    "redirect_uri": "",
    "refresh_token": "",
    "access_token": "",
    "client_secret": "",
    "client_id": "",
    "token_type": "",
    "expires_at": 0,
    "expires_in": 0
}

export async function initialiseStrava(): Promise<StravaConfig> {
    const { STRAVA_CLIENT_ID } = process.env;

    if (STRAVA_CLIENT_ID == null){
        throw new Error("Missing Credentials");
    }

    try {
        stravaConfig = await getAwsObject('config.jsonl')
    } catch (err) {
        console.log("Error", err);
        throw err;
    }

    strava.config({
        client_id: STRAVA_CLIENT_ID,
        client_secret: stravaConfig.client_secret!,
        redirect_uri: stravaConfig.redirect_uri ?? 'http://localhost:3000/',
        access_token: stravaConfig.access_token!,
    })

    if ((Date.now()/1000) > Number(stravaConfig.expires_at)) {
        const newStravaConfig = await strava.oauth.refreshToken(stravaConfig.refresh_token)
        stravaConfig = {...stravaConfig, ...newStravaConfig}
        updatwAwsObject('config.jsonl', JSON.stringify(stravaConfig));
    }

    return stravaConfig
}
