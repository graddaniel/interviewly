import config from 'config';
import fs from 'fs';

import FilesProcessor from "./files-processor";
import MQAdapter from "./mq-adapter";
import S3Adapter from "./s3-adapter";

export default class Application {
    filesProcessor: FilesProcessor;
    mqAdapter: MQAdapter;
    s3Adapter: S3Adapter;
    incomingMessagesQueue: string;
    outcomingMessagesQueue: string;
    processedRecordingsDirectory: string;

    constructor() {
        this.filesProcessor = new FilesProcessor();
        this.mqAdapter = new MQAdapter();
        this.s3Adapter = new S3Adapter(config.get('s3.recordingsBucket'));
        this.incomingMessagesQueue = config.get('rabbitMq.incomingMessagesQueue');
        this.outcomingMessagesQueue = config.get('rabbitMq.outcomingMessagesQueue');
        this.processedRecordingsDirectory = config.get('recordings.outputPath');
    }

    start = async () =>  {
        await this.mqAdapter.init();
    
        this.mqAdapter.listen(
            this.incomingMessagesQueue,
            async (message: string) => {
                try {
                    const {
                        meetingUuid,
                        deleteRecording,
                    } = JSON.parse(message);

                    const mergedFileName = await this.filesProcessor.process(meetingUuid);
                    
                    await this.s3Adapter.upload(mergedFileName, meetingUuid);
                    
                    // delete it if there's no transcription later on
                    if (deleteRecording) {
                        fs.rmSync(
                            `${this.processedRecordingsDirectory}/${meetingUuid}`,
                            { recursive: true, force: true }
                        );
                    }

                    this.mqAdapter.send(
                        this.outcomingMessagesQueue,
                        meetingUuid,
                    );
                } catch (error) {
                    console.error(error);
                }
            }
        );
    }
};