import AWS, { S3 } from 'aws-sdk';
import 'dotenv/config';

export default class S3Adapter {
    s3: S3;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            signatureVersion: 'v4',
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
}