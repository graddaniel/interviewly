import config from 'config';
import fs from 'fs';
import { readdir } from 'fs/promises';


import FilesProcessor from "./files-processor";
import MQAdapter from "./mq-adapter";
import S3BucketAdapter from "./s3-bucket-adapter";

export default class Application {
    filesProcessor: FilesProcessor;
    mqAdapter: MQAdapter;

    recordingsS3Bucket: S3BucketAdapter;
    finishedMeetingsQueue: string;
    readyRecordingsQueue: string;
    processedRecordingsDirectory: string;

    interviewRecordingsS3Bucket: S3BucketAdapter;
    recordedInterviewsQueue: string;
    readyInterviewRecordingsQueue: string;
    interviewRecordingsDirectory: string;

    constructor() {
        this.filesProcessor = new FilesProcessor();
        this.mqAdapter = new MQAdapter();

        this.recordingsS3Bucket = new S3BucketAdapter(config.get('s3.recordingsBucket'));
        this.finishedMeetingsQueue = config.get('rabbitMq.finishedMeetingsQueueName');
        this.readyRecordingsQueue = config.get('rabbitMq.readyRecordingsQueueName');
        this.processedRecordingsDirectory = config.get('recordings.meetings.outputPath');

        this.interviewRecordingsS3Bucket = new S3BucketAdapter(config.get('s3.interviewRecordingsBucket'));
        this.recordedInterviewsQueue = config.get('rabbitMq.recordedInterviewsQueueName');
        this.readyInterviewRecordingsQueue = config.get('rabbitMq.readyInterviewRecordingsQueueName');
        this.interviewRecordingsDirectory = config.get('recordings.interviews.path');
    }

    start = async () =>  {
        await this.mqAdapter.init();
    
        this.mqAdapter.listen(
            this.finishedMeetingsQueue,
            this.handleFinishedMeetings,
        );

        this.mqAdapter.listen(
            this.recordedInterviewsQueue,
            this.handleRecordedInterviews,
        );
    }

    handleFinishedMeetings = async (message: string) => {
        try {
            const {
                meetingUuid,
                deleteRecording,
            } = JSON.parse(message);

            const mergedFileName = await this.filesProcessor.processMeeting(meetingUuid);
            
            await this.recordingsS3Bucket.upload(
                `${this.processedRecordingsDirectory}/${meetingUuid}/${mergedFileName}`,
                mergedFileName,
            );
            
            // delete it if there's no transcription later on
            if (deleteRecording) {
                fs.rmSync(
                    `${this.processedRecordingsDirectory}/${meetingUuid}`,
                    { recursive: true, force: true }
                );
            }

            this.mqAdapter.send(
                this.readyRecordingsQueue,
                meetingUuid,
            );
        } catch (error) {
            console.error(error);
        }
    }

    handleRecordedInterviews = async (recordingId: string) => {
        try {
            const {
                filename,
                userEmail,
            } = await this.filesProcessor.processInterview(recordingId);
            const files = await readdir(`/opt/janus/share/janus/interviews/`);
            console.log("files",files, filename)
            await this.interviewRecordingsS3Bucket.upload(
                `${this.interviewRecordingsDirectory}/${filename}`,
                filename,
            );

            this.mqAdapter.send(
                this.readyInterviewRecordingsQueue,
                JSON.stringify({
                    filename,
                    userEmail,
                }),
            );
        } catch (error) {
            console.error(error);
        }
    }
};