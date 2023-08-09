import React, { useEffect, useRef, useState } from 'react';
import { videoRoomAdapter as VideoRoom } from 'video-calls-library';
import { useParams } from 'react-router-dom';

import { useStateCallback } from '../../../hooks/useStateCallback';
import { JANUS_HOST } from 'config/current';
import IconButton from '../../../components/icon-button/icon-button';

import classes from './meeting-page.module.css';
import CrossIconWhite from 'images/cross-icon-white.svg';
import DotIconRed from 'images/dot-icon-red.svg';
import Logo from '../../../components/logo/logo';
import moment from 'moment';
import { useTranslation } from 'react-i18next';


const { JanusVideoRoomAdapter, Utils } = VideoRoom;

const USER_PARAM_TO_TYPE_MAP = {
    r: 'researcher',
    t: 'translator',
    s: 'respondee',
};

const USERNAME = 'testUser';

const server = 'https://id8d03szbk.execute-api.eu-central-1.amazonaws.com/prod/janus'; //JANUS_HOST;

//JANUS_HOST; //'http://3.127.163.15:8088/janus'
const MeetingPage = () => {
    const params = useParams();
    const meetingId = params.meetingId as string;

    const { i18n } = useTranslation();
    const { resolvedLanguage } = i18n;

    const meetingDate = moment(new Date()).locale(resolvedLanguage as string);

    const [janusAdapter, setJanusAdapter] = useState<any>();
    const [muted, setMuted] = useState(false);
    
    const [remoteVideos, setRemoteVideos] = useStateCallback<string[]>([]);
    const remoteVideosRef = useRef<string[]>([]);
    useEffect(() => {
        remoteVideosRef.current = remoteVideos;
    }, [remoteVideos]);
    const [remoteAudios, setRemoteAudios] = useStateCallback<string[]>([]);
    const [slots, setSlots] = useStateCallback<string[]>([])
    const [slotsNames, setSlotsNames] = useState({});
    
    const usernameRef = useRef(Utils.getQueryStringValue("userName") || USERNAME);
    const userTypeParam = Utils.getQueryStringValue("userType");
    const userType = USER_PARAM_TO_TYPE_MAP[userTypeParam];

    useEffect(() => {
        if (!janusAdapter)
            return;

        janusAdapter.setUserType(userType)
    },[janusAdapter]);

    console.log("DANIEL remoteVideos", remoteVideos, remoteAudios, slots)
    console.log("ROOM", Utils.getQueryStringValue("room"), Utils.getQueryStringValue("roomToken"))
 
    useEffect(() => {
        const janusVideoRoomAdapter = new JanusVideoRoomAdapter({
            roomName: parseInt(meetingId, 10),
            use_msid: Utils.getQueryStringValue("msid") === "yes"
                || Utils.getQueryStringValue("msid") === "true",
            userType,
            serverConfig: {
                host: server,
                iceServers: [
                    {
                      urls: "stun:stun.relay.metered.ca:80",
                    },
                    {
                      urls: "turn:a.relay.metered.ca:80",
                      username: "813f425bc2d114987a5678d6",
                      credential: "EQeZFDgLaBCDEeLx",
                    },
                    {
                      urls: "turn:a.relay.metered.ca:80?transport=tcp",
                      username: "813f425bc2d114987a5678d6",
                      credential: "EQeZFDgLaBCDEeLx",
                    },
                    {
                      urls: "turn:a.relay.metered.ca:443",
                      username: "813f425bc2d114987a5678d6",
                      credential: "EQeZFDgLaBCDEeLx",
                    },
                    {
                      urls: "turn:a.relay.metered.ca:443?transport=tcp",
                      username: "813f425bc2d114987a5678d6",
                      credential: "EQeZFDgLaBCDEeLx",
                    },
                ],
            },
            //token: 'token1234',//'token1234',
            // roomToken: Utils.getQueryStringValue("roomToken") !== ""
            //     ? Utils.getQueryStringValue("roomToken")
            //     : null,
        }, {
            videoPluginAttachSuccess: () => janusVideoRoomAdapter.registerUsername(),
            muteStateChanged: (muted: boolean) => setMuted(muted),
            getUsername: () => usernameRef.current,
            newStream: (slot, streamName) => setSlotsNames(slotsNames => ({
                ...slotsNames,
                [slot]: streamName,
            })),
            getLocalVideoElement: (trackId) => document.getElementById("myvideo"),
            remoteAudioTrackAdded: (slot, mid, callback) => {
                console.log("REMOTE AUDIO ADDED")
                const key = `${slot}-${mid}`;
                setSlots((slots) => slots.includes("" + slot) ? slots : [...slots, "" + slot]);
                setRemoteAudios((remoteAudios) => [...remoteAudios, key], callback);
            },
            remoteVideoTrackAdded: (slot, mid, callback) => {
                console.log("REMOTE VIDEO ADDED")
                const key = `${slot}-${mid}`;
                setSlots((slots) => slots.includes("" + slot) ? slots : [...slots, "" + slot]);
                setRemoteVideos((remoteVideos) => [...remoteVideos, key], callback);
            },
            getRemoteAudioElement: (slot, mid) => document.getElementById(`remoteaudio${slot}-${mid}`),
            getRemoteVideoElement: (slot, mid) => document.getElementById(`remotevideo${slot}-${mid}`),
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
                    className={classes.remoteVideo}
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
        <section className={classes.meetingPage}>
            <header className={classes.header}>
                <Logo />
                <span className={classes.meetingDetails}>
                    <span className={classes.meetingDate}>{meetingDate.format('D MMMM')}</span>
                    <span className={classes.meetingHour}>{meetingDate.format('h:mm a')}</span>
                    <span className={classes.meetingName}>Meeting name</span>
                </span>
            </header>
            <main className={classes.content}>
                <div className={classes.localVideoWrapper}>
                    <video
                        className={classes.localVideo}
                        id="myvideo"
                        autoPlay
                        playsInline
                        muted={muted}
                    />
                    <div className={classes.videoControls}>
                        <IconButton
                            className={classes.recordButton}
                            icon={DotIconRed}
                            onClick={() => janusAdapter.recordRoom('adminpwd')}
                        />
                        <IconButton
                            className={classes.finishButton}
                            icon={CrossIconWhite}
                            onClick={() => janusAdapter.stopJanus()}
                        />
                    </div>
                </div>
                {slots.map((slot) => {
                    return (
                        <div key={slot} className={classes.remoteVideoWrapper}>
                            {generateStreamElement(slot, 'video')}
                            {generateStreamElement(slot, 'audio')}
                        </div>
                    )
                })}
            </main>
        </section>
    )
};

export default MeetingPage;

/*

                    <button id="mute" onClick={() => janusAdapter.toggleMute()}>
                        Mute
                    </button>
                    <button id="unpublish" onClick={() => janusAdapter.unpublishOwnFeed()}>
                        Unpublish
                    </button>
                    <button id="publish" onClick={() => janusAdapter._publishOwnFeed(true, true)}>
                        Publish
                    </button>
                    <button id="vars" onClick={() => console.log(janusAdapter.temp_getLocalVars())}>
                        VARS
                    </button>
                    <button id="stopCamera" onClick={() => console.log(janusAdapter.temp_getLocalVars())}>
                        Stop camera
                    </button>
*/