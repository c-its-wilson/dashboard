import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { config } from 'dotenv';

config();

const REGION = "eu-west-2"
const { AWS_BUCKET_NAME } = process.env;
const s3Client = new S3Client({ region: REGION });
export { s3Client };


async function streamToString(stream: any): Promise<string> {
    return new Promise((resolve, reject) => {
        const chunks: any[] = [];
        stream.on("data", (chunk: any) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
}

export async function getAwsObject(fileName: string) {
    try {
        if (AWS_BUCKET_NAME == null) {
            throw new Error("Miising Bucket Name")
        }

        const awsReq = new GetObjectCommand({
            Bucket: AWS_BUCKET_NAME, Key: fileName
        })

        const awsResp = await s3Client.send(awsReq)
        const config = (await streamToString(awsResp.Body));
        return JSON.parse(config)
    } catch (err) {
        console.log("Error", err);
        throw err;
    }
}

export async function updatwAwsObject(fileName: string, body: string) {
    try {
        if (AWS_BUCKET_NAME == null) {
            throw new Error("Miising Bucket Name")
        }

        const awsReq = new PutObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: fileName,
            Body: body
        })
        await s3Client.send(awsReq)
    } catch (err) {
        console.log("Error", err);
        throw err;
    }
}