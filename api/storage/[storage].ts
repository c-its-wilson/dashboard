import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAwsObject, updateAwsObject } from '../_aws';
import { config } from 'dotenv';
import crypto from 'crypto'

config();

export default async function storage(req: VercelRequest, resp: VercelResponse) {
    const { REACT_APP_S3_ACCESS_KEY_ID } = process.env;
    const method = req.query.storage;
    const { key, location } = req.query;

    if (!key || !method || !REACT_APP_S3_ACCESS_KEY_ID) {
        return resp.status(400).json('Bad request')
    }

    if (typeof location !== 'string') {
        return resp.status(400).json('Missing file name')
    }

    const hash = crypto.createHash('sha256').update(REACT_APP_S3_ACCESS_KEY_ID).digest('hex').toUpperCase();

    if (hash !== key) {
        return resp.status(401).json('UNAUTHORIZED ACCESS')
    }
    
    if (method == 'GET') {
        const storageResp = await getAwsObject(location)
        return resp.status(200).json(storageResp)
    } else if (method == 'PUT') {
        const contents = req.body;
        if (!contents) {
            return resp.status(400).json('Missing required body')
        }
        const storageResp = await updateAwsObject(location, contents)
        return resp.status(200).json(storageResp)
    } else {
        return resp.status(400).json('Invalid Method')
    }
}