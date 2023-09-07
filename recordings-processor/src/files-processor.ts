import ffmpeg from 'fluent-ffmpeg';
import { execSync } from 'child_process';
import fs from 'fs';
import { readdir } from 'fs/promises';
import config from 'config';

export default class FilesProcessor {
    recordingsPath: string;
    outputPath: string;

    constructor() {
        this.recordingsPath = config.get('recordings.inputPath');
        this.outputPath = config.get('recordings.outputPath');
    }

    parseFilename = (filename: string) => {
        const nameParts = filename.split('user');
        const userIdWithTimeStampAndType = nameParts[1].slice(1);
        const [
            uuidPart1,
            uuidPart2,
            uuidPart3,
            uuidPart4,
            uuidPart5,
            timestamp,
            fileType,
            midWithExtension, // ignore
        ] = userIdWithTimeStampAndType.split('-');

        const participantUuid = `${uuidPart1}-${uuidPart2}-${uuidPart3}-${uuidPart4}-${uuidPart5}`;

        return {
            filename: filename,
            participantUuid,
            timestamp,
            fileType,
        }
    };

    process = async (meetingUuid: string) => {
        const filenames = await readdir(`${this.recordingsPath}/${meetingUuid}`);
        const filesInfo = filenames.map(this.parseFilename);

        if (!fs.existsSync(`${this.outputPath}`)) {
            fs.mkdirSync(`${this.outputPath}`);
        }

        if (!fs.existsSync(`${this.outputPath}/${meetingUuid}`)) {
            fs.mkdirSync(`${this.outputPath}/${meetingUuid}`);
        }

        filesInfo.forEach(file => {
            console.log(`Copying ${file.filename}`)
            execSync(`cp ${this.recordingsPath}/${meetingUuid}/${file.filename} ${this.outputPath}/${meetingUuid}/`);
            
            const command = `\
janus-pp-rec \
${this.outputPath}/${meetingUuid}/${file.filename} \
${this.outputPath}/${meetingUuid}/${file.participantUuid}.${file.fileType === 'audio' ? 'opus' : 'webm'}`;

            const result = execSync(command);
            if (result.includes('Aborted (core dumped)')) {
                console.log("DANIEL SEGFAULT!")
            }
        });

        const grouppedFilesInfo = filesInfo.reduce(
            (grouppedFilesInfo, currentFile) => {
                const matchingFileInfo = grouppedFilesInfo.find(
                    fileInfo => fileInfo.participantUuid === currentFile.participantUuid
                );
                
                if (matchingFileInfo) {
                    matchingFileInfo[currentFile.fileType] = true;

                    return grouppedFilesInfo;
                }

                currentFile[currentFile.fileType] = true;
                const {
                    fileType,
                    ...rest
                } = currentFile;

                grouppedFilesInfo.push({ ...rest });
                return grouppedFilesInfo;
            },
            [] as any,
        );

        console.log(grouppedFilesInfo)

        await Promise.all(grouppedFilesInfo.map(
            f => this.mergeVideoAndAudioParts(f, meetingUuid)
        ));

        // await Promise.all(grouppedFilesInfo.map(this.scaleFile)); unused
        await Promise.all(
            grouppedFilesInfo
            //.filter(file => !file.audio)
            .map(f => this.addVideo(f, meetingUuid)),
        );

        return await this.createMosaic(grouppedFilesInfo, meetingUuid);
    };

    mergeVideoAndAudioParts = (fileInfo, meetingUuid) => {
        return new Promise((resolve, reject) => {
            let pipeline = ffmpeg();
            if (fileInfo.audio) {
                pipeline = pipeline.input(
                    `${this.outputPath}/${meetingUuid}/${fileInfo.participantUuid}.opus`
                );
            }
            if (fileInfo.video) {
                pipeline = pipeline.input(
                    `${this.outputPath}/${meetingUuid}/${fileInfo.participantUuid}.webm`
                );
            }
            pipeline
                .outputOptions([
                    '-c:v', 'copy',
                    '-c:a', 'opus',
                    '-strict',
                    '-2'
                ])
                .saveToFile(`${this.outputPath}/${meetingUuid}/merged_${fileInfo.participantUuid}.webm`)
                .on('progress', (progress) => {
                    if (progress.percent) {
                      console.log(`Merging: ${Math.floor(progress.percent)}% done.`);
                    }
                })
                .on('end', () => {
                    console.log(`Finished merging ${fileInfo.participantUuid}.`);
                    console.log(`Saved to ${this.outputPath}/${meetingUuid}/merged_${fileInfo.participantUuid}.webm`)
                    return resolve(fileInfo);
                })
                .on('error', (error) => {
                    console.error(`Failed to merge ${fileInfo.participantUuid}. ${error}`);
                    return reject(`Failed to merge ${fileInfo.participantUuid}. ${error}`);
                });
        });
    }

    scaleFile = (fileInfo, meetingUuid) => {
        return new Promise((resolve, reject) => {
            if (!fileInfo.video) {
                fs.cpSync(
                    `${this.outputPath}/${meetingUuid}/merged_${fileInfo.participantUuid}.webm`,
                    `${this.outputPath}/${meetingUuid}/scaled_${fileInfo.participantUuid}.webm`    
                );

                return resolve(fileInfo);
            };

            ffmpeg()
                .input(`${this.outputPath}/${meetingUuid}/merged_${fileInfo.participantUuid}.webm`)
                .size('640x480')
                .autopad(true, 'black')
                .saveToFile(`${this.outputPath}/${meetingUuid}/scaled_${fileInfo.participantUuid}.webm`)
                .on('progress', (progress) => {
                    if (progress.percent) {
                      console.log(`Scaling: ${Math.floor(progress.percent)}% done.`);
                    }
                })
                .on('end', () => {
                    console.log(`Finished scaling ${fileInfo.participantUuid}.`);
                    return resolve(fileInfo);
                })
                .on('error', (error) => {
                    console.error(`Failed to scale ${fileInfo.participantUuid}. ${error}`);
                    return reject(`Failed to scale ${fileInfo.participantUuid}. ${error}`);
                });

        });
    }

    addVideo = async (fileInfo, meetingUuid) => {
        return new Promise((resolve, reject) => {
            if (fileInfo.video) {
                fs.cpSync(
                    `${this.outputPath}/${meetingUuid}/merged_${fileInfo.participantUuid}.webm`,
                    `${this.outputPath}/${meetingUuid}/processed_${fileInfo.participantUuid}.webm`    
                );
                return resolve(fileInfo);
            } else {
                const command = ffmpeg()
                .input(
                    `${this.outputPath}/${meetingUuid}/merged_${fileInfo.participantUuid}.webm`
                )
                .input('color=c=black:s=640x480:r=25')
                .inputFormat('lavfi')
                .outputOptions(['-shortest'])
                .saveToFile(`${this.outputPath}/${meetingUuid}/processed_${fileInfo.participantUuid}.webm`)
                //console.log("DANIEL", command._getArguments().join(' '))
                command.on('progress', (progress) => {
                    if (progress.percent) {
                      console.log(`Adding audio: ${Math.floor(progress.percent)}% done.`);
                    }
                })
                .on('end', () => {
                    console.log(`Finished adding audio ${fileInfo.participantUuid}.`);
                    console.log(`Saved to ${this.outputPath}/${meetingUuid}/processed_${fileInfo.participantUuid}.webm`)
                    return resolve(fileInfo);
                })
                .on('error', (error) => {
                    console.error(`Failed to add audio ${fileInfo.participantUuid}. ${error}`);
                    return reject(`Failed to add audio ${fileInfo.participantUuid}. ${error}`);
                });
            }

            // ffmpeg().input(
            //     `${this.outputPath}/merged_${fileInfo.participantUuid}.webm`
            // )
            // .input('anullsrc=channel_layout=mono:sample_rate=22050')
            // .inputFormat('lavfi')
            // //.inputOptions(['-t', '3s'])
            // .saveToFile(`${this.outputPath}/processed_${fileInfo.participantUuid}.webm`)
            //     .on('progress', (progress) => {
            //         if (progress.percent) {
            //           console.log(`Adding audio: ${Math.floor(progress.percent)}% done.`);
            //         }
            //     })
            //     .on('end', () => {
            //         console.log(`Finished adding audio ${fileInfo.participantUuid}.`);
            //         console.log(`Saved to ${this.outputPath}/processed_${fileInfo.participantUuid}.webm`)
            //         return resolve(fileInfo);
            //     })
            //     .on('error', (error) => {
            //         console.error(`Failed to add audio ${fileInfo.participantUuid}. ${error}`);
            //         return reject(`Failed to add audio ${fileInfo.participantUuid}. ${error}`);
            //     });
        });
    }

    createMosaic = async (fileInfoArray, meetingUuid) => {
        return new Promise<string>((resolve, reject) => {
            var x=640, y=480;
            var videoInfo: any[] = [];

            let command = ffmpeg();

            fileInfoArray.forEach(
                file => {
                    const filename = `${this.outputPath}/${meetingUuid}/processed_${file.participantUuid}.webm`;
                    command = command.addInput(filename);
                    videoInfo.push({
                        filename,
                    });
                }
            );

            if (fileInfoArray.length === 1) {
                videoInfo[0].coord = { x: 0, y: 0 };
            }
            else if (fileInfoArray.length === 2) {
                videoInfo[0].coord = { x: 0, y: 0 };
                videoInfo[1].coord = { x: x/2, y: 0 };
            }
            else if (fileInfoArray.length === 3) {
                videoInfo[0].coord = { x: 0, y: 0 };
                videoInfo[1].coord = { x: x/2, y: 0 };
                videoInfo[2].coord = { x: 0, y: y/2 };
            }
            else if (fileInfoArray.length === 4) {
                videoInfo[0].coord = { x: 0, y: 0 };
                videoInfo[1].coord = { x: x/2, y: 0 };
                videoInfo[2].coord = { x: 0, y: y/2 };
                videoInfo[3].coord = { x: x/2, y: y/2 };
            }

            var complexFilter: any[] = [];
            complexFilter.push('nullsrc=size=' + x + 'x' + y + ' [base0]');
            // Scale each video
            videoInfo.forEach(function (val, index) {
                complexFilter.push({
                    filter: 'setpts=PTS-STARTPTS, scale', options: [x/2, y/2],
                    inputs: index+':v', outputs: 'block'+index
                });
            });

            // Build Mosaic, block by block
            videoInfo.forEach(function (val, index) {
                complexFilter.push({
                    filter: 'overlay',
                    options: { shortest:1, x: val.coord.x, y: val.coord.y },
                    inputs: ['base'+index, 'block'+index],
                    outputs: 'base'+(index+1)
                });
            });

            complexFilter.push('[a]amerge');

            var outFile = `${this.outputPath}/${meetingUuid}/${meetingUuid}.mp4`;

            command
                .complexFilter(complexFilter, `base${fileInfoArray.length}`)
                .saveToFile(outFile)
                .on('error', (err) => {
                    console.log(`Creating mosaic failed: ${err.message}`);
                    reject(`Creating mosaic failed: ${err.message}`);
                })	
                .on('progress', function(progress) { 
                    console.log('... frames: ' + progress.frames);
                })
                .on('end', function() { 
                    console.log('Finished creating mosaic');
                    resolve(`${meetingUuid}.mp4`);
                });
        })
    }
};