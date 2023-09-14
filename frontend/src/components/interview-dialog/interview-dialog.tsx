import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import * as RecorderLibrary from '../../lib/janus/janus-record-play-adapter.js';

import Dialog from '../dialog/dialog';
import TextButton from '../text-button/text-button';
import { JANUS_HOST } from 'config/current';

import classes from './interview-dialog.module.css';


const server = JANUS_HOST;

const InterviewDialog = ({
    isOpen,
    onClose,
    onRecordingFinished,
}) => {
    const [ isRecordingInProgress, setIsRecordingInProgress ] = useState(false);
    const [ isRecordingCompleted, setIsRecordingCompleted ] = useState(false);
    const { t } = useTranslation();

    const displayCameraPicture = async () => {
        const video = document.getElementById("cameraLookup") as HTMLVideoElement;

        if (!navigator.mediaDevices.getUserMedia) {
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            video.srcObject = stream;
        } catch (error) {
            console.error('Failed to display camera\'s picture', error);
        }
    };

    useEffect(() => {
        if (isOpen === false) {
            RecorderLibrary.stopJanus();
        } else {
            RecorderLibrary.init({
                onRecordingStarted: () => setIsRecordingInProgress(true),
                onRecordingStopped: (id) => {
                    setIsRecordingInProgress(false);
                    setIsRecordingCompleted(true);
                    onRecordingFinished(id);
                },
                onLocalVideoTrackAdded: (track, cb) => cb(),
                getLocalVideoElement: (trackId) => document.getElementById("cameraLookup"),
                onRemoteAudioTrackAdded: (track, cb) => cb(),
                getRemoteAudioElement: (mid) => null,
                onRemoteVideoTrackAdded: (track, cb) => cb(),
                getRemoteVideoElement: (mid) => null,
                newRecordingsListReceived: (list) => console.log("Recordings list:", list),
            }, {
                server,
                iceServers: null,
            });
    
            displayCameraPicture();
        }
    }, [isOpen]);

    const getButtonText = () => {
        if (!isRecordingInProgress && !isRecordingCompleted) {
            return t('join.interviewDialog.record');
        } else if (isRecordingInProgress && !isRecordingCompleted) {
            return t('join.interviewDialog.stop');
        } else {
            return t('join.interviewDialog.finish');
        }
    }

    const handleButtonClick = () => {
        if (!isRecordingInProgress && !isRecordingCompleted) {
            setIsRecordingInProgress(true);

            // TODO fix this workaround
            const recordName = (document.getElementById("email") as HTMLInputElement).value;
            RecorderLibrary.startRecording(recordName);
        } else if (isRecordingInProgress && !isRecordingCompleted) {
            setIsRecordingInProgress(false);
            setIsRecordingCompleted(true);

            RecorderLibrary.stopRecPlay();

            displayCameraPicture();
        } else {
            onClose();
        }
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
        >
            <section className={classes.content}>
                <div 
                    className={classNames(
                        classes.placeholder,
                        isRecordingInProgress && classes.recording || '',
                    )}>
                    <video
                        className={classNames(
                            classes.video,
                        )}
                        id="cameraLookup"
                        autoPlay
                        playsInline
                        muted={true}
                    />
                </div>
                <TextButton
                    className={classes.button}
                    text={getButtonText()}
                    onClick={handleButtonClick}
                />
            </section>
        </Dialog>
    )
}

export default InterviewDialog;