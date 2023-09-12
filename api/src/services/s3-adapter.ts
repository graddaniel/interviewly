import AWS, { S3 } from 'aws-sdk';
import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import 'dotenv/config';

export default class S3Adapter {
    s3: S3;
    client: S3Client;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            signatureVersion: 'v4',
            region: 'eu-central-1'
        });

        // TODO this is a quick CV uploads fix; S3Client should replace AWS.S3
        this.client = new S3Client({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
            },
            region: 'eu-central-1'
        });
    }

    getPresignedS3Url = (
        bucketName: string,
        bucketKey: string,
        expiryTime: number = 3600,
    ) => {   
        const url = this.s3.getSignedUrl('getObject', {
            Bucket: bucketName,
            Key: bucketKey,
            Expires: expiryTime
        });

        return url;
    }

    getPResignedS3UploadUrl = async (
        bucketName: string,
        bucketKey: string,
        expiryTime: number = 3600,
    ) => {
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: bucketKey,
        });
        const url = await getSignedUrl(this.client, command, { expiresIn: expiryTime });

        return url;
    }

    upload = async (
        bucketName: string,
        bucketKey: string,
        fileData: any,
    ) => {
        return new Promise<void>((resolve, reject) => {                     
            this.s3.upload({
                Bucket: bucketName,
                Key: bucketKey,
                Body: fileData
              }, (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log(`File uploaded successfully. ${data.Location}`);
                    resolve();
                }
            });
        });
    }
}