import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import VideoCalls from 'video-calls-library';

import { useStateCallback } from './useStateCallback';


const {
    videoRoomAdapter,
    recordPlayAdapter: RecorderLibrary,
} = VideoCalls;

const { JanusVideoRoomAdapter, Utils } = videoRoomAdapter;

const USER_TYPES = ['Researcher', 'Translator', 'Respondee', 'Recorder'];

const useVideoChat = true;
const server = 'https://id8d03szbk.execute-api.eu-central-1.amazonaws.com/prod/janus'

const Application = () => {
    const [janusAdapter, setJanusAdapter] = useState<any>();

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
    const recordRoom = () => janusAdapter.recordRoom('adminpwd');

    useEffect(() => {
        if (!janusAdapter)
            return;

        janusAdapter.setUserType(userType)
    },[userType, janusAdapter]);

    console.log("DANIEL remoteVideos", remoteVideos, remoteAudios, slots)
    console.log("ROOM", Utils.getQueryStringValue("room"), Utils.getQueryStringValue("roomToken"))
    useEffect(() => {
        const janusVideoRoomAdapter = new JanusVideoRoomAdapter({
            roomName: Utils.getQueryStringValue("room") !== ""
                ? parseInt(Utils.getQueryStringValue("room"))
                : 1234,
            use_msid: Utils.getQueryStringValue("msid") === "yes"
                || Utils.getQueryStringValue("msid") === "true",
            userType,
            serverConfig: {
                host: server,
                iceServers: null,
            },
            //token: 'token1234',//'token1234',
            // roomToken: Utils.getQueryStringValue("roomToken") !== ""
            //     ? Utils.getQueryStringValue("roomToken")
            //     : null,
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
    }, []);

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
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={() => janusAdapter.stopJanus()}>Stop</button>
                        <button onClick={recordRoom}>Record</button>
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
        </React.Fragment>
    )
}

const RecorderApplication = () => {
    const [ isRecordingStarted, setIsRecordingStarted ] = useState(false);
    const [ recordName, setRecordName ] = useState('');
    const [ recordingsList, setRecordingsList ] = useState([]);

    useEffect(() => {
        RecorderLibrary.init({
            onRecordingStarted: () => setIsRecordingStarted(true),
            onRecordingStopped: () => setIsRecordingStarted(false),
            onLocalVideoTrackAdded: (track, cb) => cb(),
            getLocalVideoElement: (trackId) => document.getElementById("myvideo"),
            onRemoteAudioTrackAdded: (track, cb) => cb(),
            getRemoteAudioElement: (mid) => document.getElementById('remoteaudio'),
            onRemoteVideoTrackAdded: (track, cb) => cb(),
            getRemoteVideoElement: (mid) => document.getElementById('remotevideo'),
            newRecordingsListReceived: (list) => setRecordingsList(list),
        }, {
            server,
            iceServers: null,
        });
    }, []);

    return (
        <React.Fragment>
            <div className="container">
                {isRecordingStarted && (<h1>RECORDING</h1>)}
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={() => RecorderLibrary.stopJanus()}>Stop</button>
                        <div className="container" id="videojoin">
                            <input
                                type="text"
                                placeholder="Choose a display name"
                                id="username"
                                value={recordName}
                                onChange={(e) => setRecordName(e.target.value)}
                            />
                            <button className="btn" id="record" onClick={() => RecorderLibrary.startRecording(recordName)}>Record</button>
                            <button className="btn" id="stopRecord" onClick={() => RecorderLibrary.stopRecPlay()}>Stop</button>
                            <button className="btn" id="play" onClick={() => RecorderLibrary.startPlayout()}>Play</button>
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
                                    muted={true}
                                />
                            </div>
                            <div id="recording">
                                <video
                                    id="remotevideo"
                                    autoPlay
                                    playsInline
                                />
                                <audio
                                    id="remoteaudio"
                                    autoPlay
                                    playsInline
                                />
                            </div>
                        </div>
                        <h3>Recordings</h3>
                        {recordingsList.map((recording: any) => (
                            <div key={recording.id}>
                                {JSON.stringify(recording)}
                                <button onClick={
                                    () => RecorderLibrary.selectRecording(recording.id)
                                }>
                                    select
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(useVideoChat ? <Application /> : <RecorderApplication />);
