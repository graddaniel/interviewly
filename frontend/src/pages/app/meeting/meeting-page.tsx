import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form, useNavigate, useSubmit } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { ProfileTypes } from 'shared';
import classNames from 'classnames';

import * as VideoRoom from '../../../lib/janus/janus-video-room-adapter.js';
import { useStateCallback } from '../../../hooks/use-state-callback';
import { JANUS_HOST } from 'config/current';
import IconButton from '../../../components/icon-button/icon-button';
import Popup from '../../../components/popup/popup';
import Logo from '../../../components/logo/logo';
import TextButton from '../../../components/text-button/text-button';
import { APP_ROUTES } from '../../../consts/routes';
import useAuth from '../../../hooks/useAuth';
import DropdownList from '../../../components/dropdown-list/dropdown-list';

import classes from './meeting-page.module.css';
import CrossIconWhite from 'images/cross-icon-white.svg';
import CameraIconPurple from 'images/camera-icon-purple.svg';
import DotIconRed from 'images/dot-icon-red.svg';
import DotIconGrey from 'images/dot-icon-grey.svg';
import ScreenShareIconPurple from 'images/screen-share-icon-purple.svg';
import LanguagesIconPurple from 'images/languages-icon-purple.svg';
import { useActionHandler, useLoaderHandler } from '../../../hooks/use-handlers';


const { JanusVideoRoomAdapter, Utils } = VideoRoom;

const server = JANUS_HOST;

const ROLE_TO_SUBSCRIPTION_TYPE_MAP = {
    [`${ProfileTypes.Role.InterviewlyStaff}`]: 'all',
    [`${ProfileTypes.Role.Admin}`]: 'all',
    [`${ProfileTypes.Role.Moderator}`]: 'all',
    [`${ProfileTypes.Role.Observer}`]: 'none',
    [`${ProfileTypes.Role.Translator}`]: 'audio',
    default: 'all'
};

const MeetingPage = () => {
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;
    const formRef = useRef(null);
    const submit = useSubmit();
    const navigate = useNavigate();
    const auth = useAuth();

    useActionHandler();
    const { data } = useLoaderHandler();

    useEffect(() => {
        if (!data) {
            navigate(-1);
        }
    }, [data]);

    if (!data) {
        return null;
    }

    const {
        room: roomId,
    } = data;

    // get room admin password; room join password; role;

    const meetingDate = moment(new Date()).locale(resolvedLanguage as string);

    const [ isRecording, setIsRecording ] = useState(false);
    const [ isSharing, setIsSharing ] = useState(false);

    const [janusAdapter, setJanusAdapter] = useState<any>();
    const [muted, setMuted] = useState(false);
    const [useSecondaryTrack, setUseSecondaryTrack] = useState(false);
    const [meetingFinishedPopupOpen, setMeetingFinishedPopupOpen] = useState(false);

    const [showLocalVideo, setShowLocalVideo] = useStateCallback<boolean>(false);
    const showLocalVideoRef = useRef(showLocalVideo);
    const [remoteTracks, setRemoteTracks] = useStateCallback<any[]>([]);
    const [publishing, setPublishing ] = useState(true);
    const [audioDevices, setAudioDevices] = useState<any>([]);
    const [videoDevices, setVideoDevices] = useState<any>([]);
    const [selectedAudioDeviceIndex, setSelectedAudioDeviceIndex] = useState(0);
    const [selectedVideoDeviceIndex, setSelectedVideoDeviceIndex] = useState(0);

    const getUserName = () => {
        const baseUsername = auth.currentUser?.email.replaceAll('@', '').replaceAll('.', '').replaceAll('+','');

        if (auth.currentUser?.role === ProfileTypes.Role.Admin
            || auth.currentUser?.role === ProfileTypes.Role.Moderator) {
            return "admin_" + baseUsername;
                //TODO replace observer with an actual translator role
        } else if (auth.currentUser?.role === ProfileTypes.Role.Translator) {
            return "translator_" + baseUsername;
        }

        return baseUsername;
    };

    const usernameRef = useRef(getUserName());
    const subscriptionType = ROLE_TO_SUBSCRIPTION_TYPE_MAP[auth.currentUser?.role || 'default'];

    console.log("DANIEL remoteTracks", remoteTracks)
    console.log("ROOM", Utils.getQueryStringValue("room"), Utils.getQueryStringValue("roomToken"))
 
    useEffect(() => {
        if (!janusAdapter)
            return;

        janusAdapter.setSubscriptionType(subscriptionType)
    },[janusAdapter]);

    const disconnect = useCallback(() => {
        if (confirm(t('meeting.finishConfirmationMessage'))) {
            janusAdapter.unpublishOwnFeed();
            janusAdapter.stopJanus();
            submit(formRef.current);
            setJanusAdapter(null);
        }
    }, [janusAdapter]);

    const switchLanguage = () => {
        setUseSecondaryTrack(state => {
            const newState = !state;

            return newState;
        });
    }

    useEffect(() => {
        const adminTrack = remoteTracks.find(t => t.name?.startsWith("admin_"));
        if (adminTrack) {
            const audioElement = document.getElementById(
                `remoteaudio-${adminTrack.slot}-${adminTrack.audio}`
            ) as HTMLAudioElement;
            if (audioElement) {
                audioElement.defaultMuted = useSecondaryTrack;
                audioElement.muted = useSecondaryTrack;
            }
        }
        
        const translatorTrack = remoteTracks.find(
            t => t.name?.startsWith("translator_")
        );
        if (translatorTrack) {
            const audioElement = document.getElementById(
                `remoteaudio-${translatorTrack.slot}-${translatorTrack.audio}`
            ) as HTMLAudioElement;
            if (audioElement) {
                audioElement.defaultMuted = !useSecondaryTrack;
                audioElement.muted = !useSecondaryTrack;
            }
        }

    }, [useSecondaryTrack, remoteTracks]);

    useEffect(() => {
        const janusVideoRoomAdapter = new JanusVideoRoomAdapter({
            roomName: roomId,
            use_msid: Utils.getQueryStringValue("msid") === "yes"
                || Utils.getQueryStringValue("msid") === "true",
            subscriptionType,
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
            sessionCreated: () => console.log("SESSION CREATED"),
            sessionDestroyed: () => console.log("SESSION DESTROYED"),
            roomDestroyed: () => setMeetingFinishedPopupOpen(true),
            videoPluginAttachSuccess: () => janusVideoRoomAdapter.registerUsername(),
            muteStateChanged: (muted: boolean) => setMuted(muted),
            getUsername: () => usernameRef.current,
            newStream: (slot, streamName) => {
                console.log("newStream", streamName)
                setRemoteTracks(remoteTracks => {
                    const newTracks = [...remoteTracks];
                    let trackToEdit = newTracks.find(track => track.slot === slot);
                    if (!trackToEdit) {
                        trackToEdit = {
                            slot,
                            name: streamName,
                        };
                        newTracks.push(trackToEdit);
                    } else {
                        trackToEdit.name = streamName;
                    }

                    return newTracks;
                });
            },
            localVideoTrackAdded: (trackId, callback) => {
                //callback must always be called, because it gets the element and assings stream to it
                //for some reason setting this state's value to tru again, breaks video element (new one is created?)
                if (!showLocalVideoRef.current) {
                    setShowLocalVideo(true, callback);
                    showLocalVideoRef.current = true;
                } else {
                    callback();
                }
            },
            getLocalVideoElement: (trackId) => {
                const element = document.getElementById("myvideo");
                console.log("obtaining", element);
                return element;
            },
            remoteAudioTrackAdded: (slot, mid, callback) => {
                console.log("REMOTE AUDIO ADDED", slot, mid)

                setRemoteTracks(remoteTracks => {
                    const newTracks = [...remoteTracks];
                    let trackToEdit = newTracks.find(track => track.slot === slot);
                    if (!trackToEdit) {
                        trackToEdit = { slot };
                        newTracks.push(trackToEdit);
                    }

                    trackToEdit.audio = mid;

                    return newTracks;
                }, callback);
            },
            remoteVideoTrackAdded: (slot, mid, callback) => {
                console.log("REMOTE VIDEO ADDED", slot, mid)

                setRemoteTracks(remoteTracks => {
                    const newTracks = [...remoteTracks];
                    let trackToEdit = newTracks.find(track => track.slot === slot);
                    if (!trackToEdit) {
                        trackToEdit = { slot };
                        newTracks.push(trackToEdit);
                    }

                    trackToEdit.video = mid;

                    return newTracks;
                }, callback);
            },
            getRemoteAudioElement: (slot, mid) => document.getElementById(`remoteaudio-${slot}-${mid}`),
            getRemoteVideoElement: (slot, mid) => document.getElementById(`remotevideo-${slot}-${mid}`),
            remoteTrackRemoved: (slot, mid) => {
                console.log("removing remote track", slot, mid);

                setRemoteTracks(remoteTracks => {
                    const trackToRemove = remoteTracks.find(track => track.slot === slot);
                    if (!trackToRemove) {
                        return remoteTracks;
                    }
                    
                    const trackMidsEntries = Object.entries(trackToRemove).filter(e => e[0] !== 'slot');
                    const midForRemoval = trackMidsEntries.find(([type, trackMid]) => trackMid === mid);
                    if (!midForRemoval) {
                        return remoteTracks;
                    }
                    
                    const [midType] = midForRemoval;
                    delete trackToRemove[midType];

                    const newTracks = [...remoteTracks];
                    
                    //empty track will always have 'slot' and 'name'
                    if (!trackToRemove.audio && !trackToRemove.video) {
                        newTracks.splice(
                            newTracks.indexOf(trackToRemove),
                            1,
                        );
                    }

                    return newTracks;
                });
            },
            remoteStreamUnpublished: (slot) => console.log("slot unpublished", slot),
            unpublished: (id) => console.log("feed left", id),
            devicesListReceived: (devices) => {
                console.log("DEVICES", devices)
                const audioDevices = devices.filter(d => d.kind === 'audioinput');
                const videoDevices = devices.filter(d => d.kind === 'videoinput');

                setAudioDevices(audioDevices);
                setVideoDevices(videoDevices);
            },
            localShareTrackAdded: (trackId, callback) => {
                console.log("showing screen share")
            },
            getLocalShareScreenElement: () => document.getElementById("screen"),
        });

        janusVideoRoomAdapter.init();

        setJanusAdapter(janusVideoRoomAdapter);

        return () => {
            janusVideoRoomAdapter.unpublishOwnFeed();
            janusVideoRoomAdapter.stopJanus();
        }
    }, []);

    const generateStreamElement = (slot, mid, type) => {
        if (type === 'video') {
            return (
                <video
                    className={classes.remoteVideo}
                    id={`remotevideo-${slot}-${mid}`}
                    autoPlay
                    playsInline
                />
            );
        }

        if (type === 'audio') {
            return (
                <audio
                    id={`remoteaudio-${slot}-${mid}`}
                    autoPlay
                    playsInline
                />
            );
        }

        return null;
    }

    return (
        <Form
            className={classes.meetingPage}
            method='post'
            ref={formRef}
        >
            <header className={classes.header}>
                <Logo />
                <div className={classes.meetingDetails}>
                    <span className={classes.meetingDate}>{meetingDate.format('D MMMM')}</span>
                    <span className={classes.meetingHour}>{meetingDate.format('h:mm a')}</span>
                    <span className={classes.meetingName}>Meeting name</span>
                    <DropdownList
                        className={classes.audioDropdown}
                        listClassName={classes.audioDropdownList}
                        name="audioInput"
                        elementsList={audioDevices.map(d => d.label)}
                        onChange={(i) => setSelectedAudioDeviceIndex(i)}
                        defaultIndex={0}
                        allowDeselect={false}
                    />
                    <DropdownList
                        className={classes.videoDropdown}
                        listClassName={classes.videoDropdownList}
                        name="videoInput"
                        elementsList={videoDevices.map(d => d.label)}
                        onChange={(i) => setSelectedVideoDeviceIndex(i)}
                        defaultIndex={0}
                        allowDeselect={false}
                    />
                    <TextButton
                        className={classes.deviceSelectionButton}
                        text="Change"
                        onClick={() => {
                            janusAdapter.restartCapture(
                                videoDevices[selectedVideoDeviceIndex].deviceId,
                                audioDevices[selectedAudioDeviceIndex].deviceId
                            );
                        }}
                    />
                </div>
            </header>
            <main className={classes.content}>
                {showLocalVideo && (
                    <div className={classes.localVideoWrapper}>
                        <video
                            className={classes.localVideo}
                            id="myvideo"
                            autoPlay
                            playsInline
                            muted={muted}
                        />
                    </div>
                )}
                {remoteTracks.map((track) => {
                    return (
                        <div key={track.slot} className={
                            classNames(
                                classes.remoteVideoWrapper,
                                track.video && classes.withLeftMargin,
                            )}>
                            {track.video && generateStreamElement(track.slot, track.video, 'video')}
                            {track.audio && generateStreamElement(track.slot, track.audio, 'audio')}
                        </div>
                    )
                })}
                <div className={classes.videoControls}>
                    <IconButton
                        className={classNames(
                            classes.controlButton,
                            useSecondaryTrack && classes.buttonOn,
                        )}
                        icon={LanguagesIconPurple}
                        onClick={switchLanguage}
                    />
                    {false && <IconButton
                        className={classes.controlButton}
                        icon={CameraIconPurple}
                        onClick={() => {
                            publishing
                                ? janusAdapter.unpublishOwnFeed()
                                : janusAdapter.publishOwnFeed({
                                    videoDeviceId: videoDevices[selectedVideoDeviceIndex].deviceId,
                                    audioDeviceId: audioDevices[selectedAudioDeviceIndex].deviceId
                                });
                            setPublishing(state => !state);
                        }}
                    />}
                    {(auth.currentUser?.role === ProfileTypes.Role.Admin
                        || auth.currentUser?.role === ProfileTypes.Role.Moderator) && (
                        <IconButton
                            className={classNames(
                                classes.recordButton,
                                isRecording && classes.disabledButton,
                            )}
                            icon={isRecording ? DotIconGrey : DotIconRed}
                            onClick={() => {
                                if (isRecording) {
                                    return;
                                }

                                janusAdapter.recordRoom('adminpwd');
                                setIsRecording(true)
                            }}
                        />
                    )}
                    <IconButton
                        className={classNames(
                            classes.controlButton,
                            isSharing && classes.buttonOn,
                        )}
                        icon={ScreenShareIconPurple}
                        onClick={() => {
                            if (isSharing) {
                                janusAdapter.stopSharing();
                                setIsSharing(false);
                            } else {
                                janusAdapter.shareScreen();
                                setIsSharing(true);
                            }
                        }}
                    />
                    <IconButton
                        className={classes.finishButton}
                        icon={CrossIconWhite}
                        onClick={disconnect}
                    />
                </div>
            </main>
            {meetingFinishedPopupOpen && (
                <Popup className={classes.meetingFinishedPopup}>
                    <h6 className={classes.popupText}>
                        {t('meeting.finishedMessage')}
                    </h6>
                    <TextButton
                        text={t('buttons.back')}
                        onClick={() => {
                            setMeetingFinishedPopupOpen(false);
                            navigate(APP_ROUTES.CALENDAR.PATH);
                        }}
                    />
                </Popup>
            )}
        </Form>
    )
};

export default MeetingPage;