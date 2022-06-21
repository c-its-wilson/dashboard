import { NextApiRequest, NextApiResponse } from 'next';
import { initialiseStrava } from '../api/_strava'
import { default as strava } from 'strava-v3';

export default async function athleteData(req: NextApiRequest, resp: NextApiResponse) {

    const { access_token, client_id } = await initialiseStrava();

    const data = await strava.athlete.get({id: client_id, access_token})
    return resp.status(200).json(data.bio)

}


