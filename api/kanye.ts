import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function demo(req: NextApiRequest, resp: NextApiResponse) {
    const kResp = await fetch('https://api.kanye.rest/')
    const quote = await kResp.json();
    return resp.status(200).json(quote)
}