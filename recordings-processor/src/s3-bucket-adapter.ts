import AWS, { S3 } from 'aws-sdk';
import fs from 'fs';
import 'dotenv/config';
import config from 'config';


export default class S3BucketAdapter {
    s3: S3;
    bucketName: string;

    constructor(bucketName: string) {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });

        this.bucketName = bucketName;
    }

    upload = async (filePath: string, fileName: string) => {
        return new Promise<void>((resolve, reject) => {
            const fileData = fs.readFileSync(filePath);
                      
            this.s3.upload({
                Bucket: this.bucketName,
                Key: fileName,
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