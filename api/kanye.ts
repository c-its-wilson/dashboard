import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function demo(req: VercelRequest, resp: VercelResponse) {
    const kResp = await fetch('https://api.kanye.rest/')
    const quote = await kResp.json();
    return resp.status(200).json(quote)
}