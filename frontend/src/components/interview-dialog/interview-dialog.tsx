import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { JanusVideoRoomAdapter, Utils } from 'video-calls-library';

import Dialog from '../dialog/dialog';
import { useStateCallback } from '../../hooks/useStateCallback'


const USER_TYPES = ['Researcher', 'Translator', 'Respondee', 'Recorder'];

const InterviewDialog = ({
    isOpen,
    onClose,
}) => {
    const [janusAdapter, setJanusAdapter] = useState<any>(null);

    const [muted, setMuted] = useState(false);

    const [username, setUsername] = useState('');
    const usernameRef = useRef('');
    useEffect(() => {
        usernameRef.current = username;
    }, [username]);

    const [userType, setUserType] = useState(USER_TYPES[0].toLowerCase());

    const [remoteVideos, setRemoteVideos] = useStateCallback<string[]>([]);
    const remoteVideosRef = useRef<string[]>([]);
    useEffect(() => {
        remoteVideosRef.current = remoteVideos;
    }, [remoteVideos]);
    const [remoteAudios, setRemoteAudios] = useStateCallback<string[]>([]);
    const [slots, setSlots] = useStateCallback<string[]>([])
    const [slotsNames, setSlotsNames] = useState({});

    //@ts-ignore
    const joinTheRoom = () =>  janusAdapter.registerUsername();
    //@ts-ignore
    const toggleMute = () => janusAdapter.toggleMute();
    //@ts-ignore
    const unpublish = () => janusAdapter.unpublishOwnFeed();

    useEffect(() => {
        if (!janusAdapter)
            return;

        janusAdapter.setUserType(userType)
    },[userType, janusAdapter]);

    console.log("DANIEL remoteVideos", remoteVideos, remoteAudios, slots)
    const setupJanus = async () => {
        const interviewCreationResponse = await axios.post('http://localhost:8083/initializeRecording', {});
        const { data: interviewRoomInfo } = interviewCreationResponse;

        console.log("INTERVIEW ROOM INFO", interviewRoomInfo);
        const {
            room,
            authToken,
            userToken,
        } = interviewRoomInfo;

        const janusVideoRoomAdapter = new JanusVideoRoomAdapter({
            roomName: room,
            token: authToken,
            roomToken: userToken,
            use_msid: Utils.getQueryStringValue("msid") === "yes"
                || Utils.getQueryStringValue("msid") === "true",
            userType,
            serverConfig: {
                host: 'localhost',
                iceServers: null,
                useHttps: false,
            }
        }, {
            janusStarting: () => {}, // disable start button
            muteStateChanged: (muted: boolean) => setMuted(muted),
            unpublishingOwnFeed: () => {}, //disable unpublish button
            publishingOwnFeed: () => {}, //disable publish button
            createOfferFailed: () => {}, //we could try to publish again
            getUsername: () => usernameRef.current,
            videoStreamRejected: () => {}, //display info that there's no video stream
            videoPluginAttachSuccess: () => {}, //unblock user registration and janus stop
            peerConnectionStateChanged: (on) => {}, //remove publish button and unblock ui
            localVideoControlsCanBeEnabled: () => {}, //show or enable mute and publish buttons
            localStreamUnpublished: () => {}, //show publish button
            unpublished: (slot) => {}, //remove video of slot
            joinedAsSubscriber: () => {}, //hide join controls, show videos
            newStream: (slot, streamName) => setSlotsNames(slotsNames => ({
                ...slotsNames,
                [slot]: streamName,
            })),
            publishingStream: () => {}, //display info that publishing is in progress
            localVideoTrackRemoved: (trackId) => {}, //remove video track
            noMoreLocalVideoTracks: () => {}, //show info that there are no video tracks
            localVideoTrackAdded: (trackId) => {}, //add video element; not needed
            getLocalVideoElement: (trackId) => document.getElementById("myvideo"),
            remoteStreamUnpublished: (slot) => {}, //remove whole the container dedicated to remote slot
            remoteVideoTrackRemoved: (slot, mid) => {}, //remove video element of a certain track
            noMoreRemoteVideoTracks: (slot) => {}, //display message about no more remote video tracks
            remoteAudioTrackAdded: (slot, mid, callback) => {
                const key = `${slot}-${mid}`;
                setSlots((slots) => slots.includes("" + slot) ? slots : [...slots, "" + slot]);
                setRemoteAudios((remoteAudios) => [...remoteAudios, key], callback);
            },
            // remoteVideosRef.current = [...remoteVideosRef.current, `${slot}-${mid}`]
            remoteVideoTrackAdded: (slot, mid, callback) => {
                const key = `${slot}-${mid}`;
                setSlots((slots) => slots.includes("" + slot) ? slots : [...slots, "" + slot]);
                setRemoteVideos((remoteVideos) => [...remoteVideos, key], callback);
            },
            getRemoteAudioElement: (slot, mid) => document.getElementById(`remoteaudio${slot}-${mid}`),
            getRemoteVideoElement: (slot, mid) => document.getElementById(`remotevideo${slot}-${mid}`),
            getRemoteVideoElements: (slot, mid) => remoteVideosRef.current.filter(videoKey => videoKey === `${slot}-${mid}`),
        });

        // @ts-ignore
        // Janus.init({
        //     debug: "all",
        //     callback: janusVideoRoomAdapter.startJanus,
        // });
        janusVideoRoomAdapter.init();

        setJanusAdapter(janusVideoRoomAdapter);
    };

    useEffect(() => {
        if (isOpen && !janusAdapter) {
            setupJanus();
        }
    }, [isOpen]);

    const generateStreamElement = (slot, type) => {
        let collection;
        switch(type) {
            case 'video':
                collection = remoteVideos;
                break;
            case 'audio':
                collection = remoteAudios;
                break;
            default:
                collection = [];
        }

        const key = collection.find((key: string) => key.split('-')[0] === slot);
        if (!key) {
            return null;
        }

        if (type === 'video') {
            return (
                <video
                    id={`remotevideo${key}`}
                    autoPlay
                    playsInline
                />
            );
        }

        if (type === 'audio') {
            return (
                <audio
                    id={`remoteaudio${key}`}
                    autoPlay
                    playsInline
                />
            );
        }

        return null;
    }

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={() => janusAdapter.stopJanus()}>Stop</button>
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            {USER_TYPES.map(userType => (
                                <option
                                    key={userType}
                                    value={userType.toLowerCase()}
                                >
                                    {userType}
                                </option>
                            ))}
                        </select>
                        <div className="container" id="videojoin">
                            <input
                                type="text"
                                placeholder="Choose a display name"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <button className="btn" id="register" onClick={joinTheRoom}>Join the room</button>
                        </div>
                        <div className="container" id="videos">
                            <div className="panel-heading">
                                <h3 className="panel-title">Local Video <span className="label label-primary" id="publisher"></span></h3>
                            </div>
                            <div className="panel-body" id="videolocal">
                                <video
                                    id="myvideo"
                                    autoPlay
                                    playsInline
                                    muted={muted}
                                />
                                <button id="mute" onClick={toggleMute}>Mute</button>
                                <button id="unpublish" onClick={unpublish}>Unpublish</button>
                            </div>
                            {slots.map((slot) => {
                                return (
                                    <div key={slot}>
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Remote Video #{slot} - {slotsNames[slot]}
                                                <span className="label label-info" id={`remote${slot}`}></span>
                                            </h3>
                                        </div>
                                        <div className="panel-body relative" id={`videoremote${slot}`}>
                                            {generateStreamElement(slot, 'video')}
                                            {generateStreamElement(slot, 'audio')}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default InterviewDialog;