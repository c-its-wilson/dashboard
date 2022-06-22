import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { config } from 'dotenv';

config();

const REGION = "eu-west-2"
const { REACT_APP_S3_BUCKET_NAME, REACT_APP_S3_ACCESS_KEY_ID, REACT_APP_S3_SECRET_ACCESS_KEY } = process.env;

if (REACT_APP_S3_BUCKET_NAME == null || REACT_APP_S3_ACCESS_KEY_ID == null || REACT_APP_S3_SECRET_ACCESS_KEY == null) {
    throw new Error("Missing AWS Credentials")
}
const s3Client = new S3Client({ 
    region: REGION, 
    credentials: { 
        accessKeyId: REACT_APP_S3_ACCESS_KEY_ID, 
        secretAccessKey: REACT_APP_S3_SECRET_ACCESS_KEY
    }
});
export { s3Client };

export async function streamToString(stream: any): Promise<string> {
    return new Promise((resolve, reject) => {
        const chunks: any[] = [];
        stream.on("data", (chunk: any) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
}

export async function getAwsObject(fileName: string) {
    try {
        const awsReq = new GetObjectCommand({
            Bucket: REACT_APP_S3_BUCKET_NAME, Key: fileName
        })

        const awsResp = await s3Client.send(awsReq)
        const config = (await streamToString(awsResp.Body));
        return JSON.parse(config)
    } catch (err) {
        console.log("Error", err);
        throw err;
    }
}

export async function updateAwsObject(fileName: string, body: string) {
    try {
        const awsReq = new PutObjectCommand({
            Bucket: REACT_APP_S3_BUCKET_NAME,
            Key: fileName,
            Body: body
        })
        await s3Client.send(awsReq)
    } catch (err) {
        console.log("Error", err);
        throw err;
    }
}