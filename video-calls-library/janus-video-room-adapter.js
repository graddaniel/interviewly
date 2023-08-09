// We import the settings.js file to know which address we should contact
// to talk to Janus, and optionally which STUN/TURN servers should be
// used as well. Specifically, that file defines the "server" and
// "iceServers" properties we'll pass when creating the Janus session.

/* global iceServers:readonly, Janus:readonly, server:readonly */

/*
TODO:
-Inject UI interaction via callbacks
-Move remaining variables inside the class
-split the callbacks generation
*/

import Janus from './janus';

export class Utils {
    static escapeXmlTags = (value) => {
        if(value) {
            let escapedValue = value.replace(new RegExp('<', 'g'), '&lt');
            escapedValue = escapedValue.replace(new RegExp('>', 'g'), '&gt');
            return escapedValue;
        }
    }

    static getQueryStringValue = (name) => {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

var sfutest = null;

var feeds = {}, feedStreams = {}, subStreams = {}, slots = {}, mids = {}, subscriptions = {};
var localTracks = {}, localVideos = 0, remoteTracks = {};

const DEFAULT_CALLBACKS = {
    janusStarting: () => {}, // disable start button
    muteStateChanged: (muted) => {}, //handle mute state change
    unpublishingOwnFeed: () => {}, //disable unpublish button
    publishingOwnFeed: () => {}, //disable publish button
    createOfferFailed: () => {}, //we could try to publish again
    getUsername: () => '', // get the username from the parent
    videoStreamRejected: () => {}, //display info that there's no video stream
    videoPluginAttachSuccess: () => {}, //unblock user registration and janus stop
    peerConnectionStateChanged: (on) => {}, //remove publish button and unblock ui
    localVideoControlsCanBeEnabled: () => {}, //show or enable mute and publish buttons
    localStreamUnpublished: () => {}, //show publish button
    unpublished: (slot) => {}, //remove video of slot
    joinedAsSubscriber: () => {}, //hide join controls, show videos
    newStream: (slot, streamName) => {}, //handle new stream
    publishingStream: () => {}, //display info that publishing is in progress
    localVideoTrackRemoved: (trackId) => {}, //remove video track
    noMoreLocalVideoTracks: () => {}, //show info that there are no video tracks
    localVideoTrackAdded: (trackId) => {}, //add video element; not needed
    getLocalVideoElement: (trackId) => null, //get element where the local video will be displayed
    remoteStreamUnpublished: (slot) => {}, //remove whole the container dedicated to remote slot
    remoteVideoTrackRemoved: (slot, mid) => {}, //remove video element of a certain track
    noMoreRemoteVideoTracks: (slot) => {}, //display message about no more remote video tracks
    remoteAudioTrackAdded: (slot, mid, callback) => {}, // get element where the remote audio will be played
    // remoteVideosRef.current = [...remoteVideosRef.current, `${slot}-${mid}`]
    remoteVideoTrackAdded: (slot, mid, callback) => {}, //get element where the remote video will be played
    getRemoteAudioElement: (slot, mid) => null, //get one particular audio element
    getRemoteVideoElement: (slot, mid) => null, //get one particular video element
};

class JanusConfig {
    constructor(janusVideoRoomAdapter) {
        this.server = janusVideoRoomAdapter.serverConfig.host;
        this.iceServers = janusVideoRoomAdapter.serverConfig.iceServers;

        this.success = () => janusVideoRoomAdapter.janus.attach(janusVideoRoomAdapter._generateJanusCallbacks());
        this.destroyed = () => window?.location.reload();
        this.token = janusVideoRoomAdapter.token,
        this.error = (error) => {
            Janus.error(error);
        };
    }
}

export class JanusVideoRoomAdapter {
    constructor({
        roomName,
        userType,
        use_msid,
        token,
        roomToken,
        serverConfig,
    }, callbacks) {
        this.serverConfig = serverConfig;
        this.token = token;
        if (roomToken) {
            this.roomToken = roomToken;
        }

        this.janus = null;
        this.creatingSubscription = false;

        this.opaqueId = "videoroomtest-" + Janus.randomString(12);

        this.username = null;
        this.userType = userType;
        this.id = null;
        // We use this other ID just to map our subscriptions to us
        this.privateId = null;
        this.stream = null;

        this.roomName = roomName;
        this.remoteFeed = null;

        this.use_msid = use_msid;

        this.callbacks = {
            ...DEFAULT_CALLBACKS,
            ...callbacks,
        };
    }

    temp_getLocalVars = () => {
        return {
            feeds,
            feedStreams,
            subStreams,
            slots,
            mids,
            subscriptions,
            localTracks,
            localVideos,
            remoteTracks,
        };
    }

    init = () => {
        Janus.init({
            debug: "all",
            callback: this.startJanus,
        });
    }

    setUserType = (userType) => this.userType = userType; 

    startJanus = () => {
        this.callbacks.janusStarting();

        if(!Janus.isWebrtcSupported()) {
            Janus.error("No WebRTC support... ");
            return;
        }
    
        this.janus = new Janus(new JanusConfig(this));
    }

    stopJanus = () => {
        Janus.debug("Stopping Janus");
        this.janus.destroy();
    }

    toggleMute = () => {
        let muted = sfutest.isAudioMuted();
        Janus.log((muted ? "Unmuting" : "Muting") + " local stream...");
        if(muted)
            sfutest.unmuteAudio();
        else
            sfutest.muteAudio();
        muted = sfutest.isAudioMuted();

        this.callbacks.muteStateChanged(muted);
    }

    registerUsername = () => {
        const username = this.callbacks.getUsername();

        if(username === "") {
            console.error("Empty username")
            return;
        }
    
        if(/[^a-zA-Z0-9]/.test(username)) {
            console.error("Incorrect username")
            return;
        }
    
        const register = {
            request: "join",
            room: this.roomName,
            ptype: "publisher",
            display: username
        };

        if (this.roomToken) {
            register.token = this.roomToken;
        }
    
        this.username = Utils.escapeXmlTags(username);
    
        sfutest.send({ message: register });
    }

    unpublishOwnFeed = () => {
        this.callbacks.unpublishingOwnFeed();

        sfutest.send({
            message: {
                request: "unpublish"
            }
        });
    }

    recordRoom = (adminSecret) => {
        const message = {
            request: "enable_recording",
            room: this.roomName,
            record: true,
        };

        if (adminSecret) {
            message.secret = adminSecret;
        }

        sfutest.send({
            message,
        });
    }

    _generateJanusCallbacks = () => ({
        plugin: "janus.plugin.videoroom",
        opaqueId: this.opaqueId,
        success: (pluginHandle) => {
            sfutest = pluginHandle;
    
            Janus.log("Plugin attached! (" + sfutest.getPlugin() + ", id=" + sfutest.getId() + ")");
            Janus.log("  -- This is a publisher/manager");
    
            this.callbacks.videoPluginAttachSuccess();
        },
        error: (error) => Janus.error("  -- Error attaching plugin...", error),
        iceState: (state) => Janus.log("ICE state changed to " + state),
        webrtcState: (on) => {
            Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
            this.callbacks.peerConnectionStateChanged(on);
        },
        slowLink: (uplink, lost, mid) => {
            Janus.warn("Janus reports problems " + (uplink ? "sending" : "receiving") +
            " packets on mid " + mid + " (" + lost + " lost packets)");
        },
        onmessage: (msg, jsep) => {
            Janus.debug(" ::: Got a message (publisher) :::", msg);
            const { videoroom } = msg;
            Janus.debug("Videoroom message: " + videoroom);

            if(videoroom != undefined && videoroom != null) {
                this._handleVideoRoomMessage(msg, videoroom);
            }

            if(jsep) {
                Janus.debug("Handling SDP as well...", jsep);
                sfutest.handleRemoteJsep({ jsep });
                
                const audio = msg.audio_codec;
                if(this.stream && this.stream.getAudioTracks() && this.stream.getAudioTracks().length > 0 && !audio) {
                    Janus.warn("Our audio stream has been rejected, viewers won't hear us");
                }

                const video = msg.video_codec;
                if(this.stream && this.stream.getVideoTracks() && this.stream.getVideoTracks().length > 0 && !video) {
                    Janus.warn("Our video stream has been rejected, viewers won't see us");
                    this.callbacks.videoStreamRejected();
                }
            }
        },
        onlocaltrack: (track, on) => {
            Janus.debug(" ::: Got a local track event :::");
            Janus.debug("Local track " + (on ? "added" : "removed") + ":", track);
            // We use the track ID as name of the element, but it may contain invalid characters
            let trackId = track.id.replace(/[{}]/g, "");

            if (!on) {
                this._removeLocalTrack(track);
                return;
            }

            // If we're here, a new track was added
            let stream = localTracks[trackId];
            if(stream) {
                // We've been here already
                return;
            }

            this.callbacks.localVideoControlsCanBeEnabled();

            if(track.kind === "audio") {
                // We ignore local audio tracks, they'd generate echo anyway
                if(localVideos === 0) {
                    this.callbacks.noMoreLocalVideoTracks();
                }

            } else {
                localVideos++;
                const stream = new MediaStream([track]);
                localTracks[trackId] = stream;
                Janus.log("Created local stream:", stream);
                Janus.log(stream.getTracks());
                Janus.log(stream.getVideoTracks());

                this.callbacks.localVideoTrackAdded(trackId);

                Janus.attachMediaStream(this.callbacks.getLocalVideoElement(trackId), stream);
            }

            if(sfutest.webrtcStuff.pc.iceConnectionState !== "completed" &&
                    sfutest.webrtcStuff.pc.iceConnectionState !== "connected") {
                this.callbacks.publishingStream();
            }
        },
        oncleanup: () => {
            Janus.log(" ::: Got a cleanup notification: we are unpublished now :::");
            this.stream = null;
            delete feedStreams[this.id];

            this.callbacks.localStreamUnpublished();

            localTracks = {};
            localVideos = 0;
        }
    });

    _publishOwnFeed = (useAudio, useVideo = true) => {
        this.callbacks.publishingOwnFeed();
    
        let tracks = [];
        if(useAudio)
            tracks.push({
                type: 'audio',
                capture: true,
                recv: false
            });
    
        if (useVideo) {
            tracks.push({
                type: 'video',
                capture: true,
                recv: false
            });
        }
    
        sfutest.createOffer({
            tracks: tracks,
            success: (jsep) => {
                Janus.debug("Got publisher SDP!");
                Janus.debug(jsep);

                sfutest.send({
                    message: {
                        request: "configure",
                        audio: useAudio,
                        video: useVideo,
                    },
                    jsep
                });
            },
            error: (error) => {
                Janus.error("WebRTC error:", error);
                if (useAudio) {
                    this._publishOwnFeed(false);
                } else {
                    this.callbacks.createOfferFailed();
                }
            }
        });
    }

    _subscribeTo = (sources) => {
        if(this.creatingSubscription) {
            setTimeout(() => this._subscribeTo(sources), 500);
            return;
        }

        // If we already have a working subscription handle, just update that one
        if (this.remoteFeed) {
            this._updateSubscriptionWithNewStreams(sources);

            return;
        }

        // If we got here, we're creating a new handle for the subscriptions (we only need one)
        this.creatingSubscription = true;
        this.janus.attach({
			plugin: "janus.plugin.videoroom",
			opaqueId: this.opaqueId,
			success: (pluginHandle) => {
				this.remoteFeed = pluginHandle;
				remoteTracks = {};
				Janus.log("Plugin attached! (" + this.remoteFeed.getPlugin() + ", id=" + this.remoteFeed.getId() + ")");
				Janus.log("  -- This is a multistream subscriber");
				
                this._createNewSubscriptionsWithNewStreams(sources);
			},
			error: (error) => Janus.error("  -- Error attaching plugin...", error),
			webrtcState: (on) => {
				Janus.log("Janus says this WebRTC PeerConnection (remote feed) is " + (on ? "up" : "down") + " now");
			},
			onmessage: (msg, jsep) => {
				Janus.debug(" ::: Got a message (subscriber) :::", msg);
				const videoroomMessage = msg.videoroom;
				Janus.debug("VideoRoom message: " + videoroomMessage);

				if(msg.error) {
					Janus.error(msg.error);
				} else if(videoroomMessage === "attached") {
                    this.creatingSubscription = false;
                    Janus.log("Successfully attached to feed in room " + msg.room);
				}

				if(msg.streams) {
					// Update map of subscriptions by mid
					for(const stream of msg.streams) {
						const { mid } = stream;

						subStreams[mid] = stream;

						const feed = feedStreams[stream.feed_id];
						if(feed && feed.slot) {
							slots[mid] = feed.slot;
							mids[feed.slot] = mid;
						}
					}
				}

				if(jsep) {
					Janus.debug("Handling SDP as well...", jsep);
					this._sendWebRTCAnswer(jsep);
				}
			},
			onremotetrack: (track, mid, on, metadata) => {
				Janus.debug(
					"Remote track (mid=" + mid + ") " +
					(on ? "added" : "removed") +
					(metadata ? " (" + metadata.reason + ") ": "") + ":", track
				);

				// Which publisher are we getting on this mid?
				let sub = subStreams[mid];
				let feed = feedStreams[sub.feed_id];
				Janus.debug(" >> This track is coming from feed " + sub.feed_id + ":", feed);

				let slot = slots[mid];
				if(feed && !slot) {
					slot = feed.slot;
					slots[mid] = feed.slot;
					mids[feed.slot] = mid;
				}

				Janus.debug(" >> mid " + mid + " is in slot " + slot);
				if(!on) {
					// Track removed, get rid of the stream and the rendering
					this.callbacks.remoteVideoTrackRemoved(slot, mid);
					if(track.kind === "video" && feed) {
						feed.remoteVideos--;
						if(feed.remoteVideos === 0) {
							// No video, at least for now: show a placeholder
                            this.callbacks.noMoreRemoteVideoTracks(slot);
						}
					}
					delete remoteTracks[mid];
					delete slots[mid];
					delete mids[slot];
					return;
				}

				// If we're here, a new track was added
				if(feed.spinner) {
					feed.spinner.stop();
					feed.spinner = null;
				}

                if(remoteTracks[mid]) {
                    return;
                }

				if(track.kind === "audio") {
					let stream = new MediaStream([track]);
					remoteTracks[mid] = stream;

					Janus.log("Created remote audio stream:", stream);

                    this.callbacks.remoteAudioTrackAdded(slot, mid, () => {
                        const audioElement = this.callbacks.getRemoteAudioElement(slot, mid);
                        Janus.attachMediaStream(audioElement, stream);
                        
                        if(feed.remoteVideos === 0) {
                            this.callbacks.noMoreRemoteVideoTracks(slot);
                        }
                    });
				} else {
					feed.remoteVideos++;
					let stream = new MediaStream([track]);
					remoteTracks[mid] = stream;

					Janus.log("Created remote video stream:", stream);

                    this.callbacks.remoteVideoTrackAdded(slot, mid, () => {
                        const videoElement = this.callbacks.getRemoteVideoElement(slot, mid);
                        Janus.attachMediaStream(videoElement, stream);
                        // Note: we'll need this for additional videos too
                    });
				}
			},
			oncleanup: () => {
				Janus.log(" ::: Got a cleanup notification (remote feed) :::");
				for(let i = 1; i < 6; i += 1) {
                    this.callbacks.remoteStreamUnpublished(i);
					feedStreams[i].remoteVideos = 0;
				}
				remoteTracks = {};
			}
		});
    }

    _createNewSubscriptionsWithNewStreams = (sources) => {
                // Prepare the streams to subscribe to, as an array: we have the list of
				// streams the feed is publishing, so we can choose what to pick or skip
                const [subscription] = this._findNewAndOldStreams(sources);

				// We wait for the plugin to send us an offer
				this.remoteFeed.send({
                        message: {
                        request: "join",
                        room: this.roomName,
                        ptype: "subscriber",
                        streams: subscription,
                        use_msid: this.use_msid,
                        private_id: this.privateId
                    }
                });
    }

    _updateSubscriptionWithNewStreams = (sources) => {
            // Prepare the streams to subscribe to, as an array: we have the list of
            // streams the feeds are publishing, so we can choose what to pick or skip
            const [added, removed] = this._findNewAndOldStreams(sources);

            if(added.length === 0 && removed.length === 0) {
                return;
            }

            let update = { request: 'update' };
            if(added) {
                update.subscribe = added;
            }
            if(removed.length > 0) {
                update.unsubscribe = removed;
            }

            this.remoteFeed.send({ message: update });
            // Nothing else we need to do
    }

    _findNewAndOldStreams = (sources) => {
        const newStreams = [];
        const oldStreams = [];
        for(const streams of sources) {
            for(const stream of streams) {
                if (
                    stream.type === "video"
                    && Janus.webRTCAdapter.browserDetails.browser === "safari"
                    && (stream.codec === "vp9" || (stream.codec === "vp8" && !Janus.safariVp8))
                ) {
                    Janus.warn("Publisher is using " + stream.codec.toUpperCase +
                        ", but Safari doesn't support it: disabling video stream #" + stream.mindex);
                    continue;
                }

                if (stream.disabled) {
                    Janus.log("Disabled stream:", stream);

                    oldStreams.push({
                        feed: stream.id,	// This is mandatory
                        mid: stream.mid		// This is optional (all streams, if missing)
                    });

                    delete subscriptions[stream.id][stream.mid];
                    continue;
                }

                if (subscriptions[stream.id] && subscriptions[stream.id][stream.mid]) {
                    Janus.log("Already subscribed to stream, skipping:", stream);
                    continue;
                }

                // Find an empty slot in the UI for each new source
                if (!feedStreams[stream.id].slot) {
                    for (let slot = 1; slot < 6; slot += 1) {
                        if (!feeds[slot]) {
                            feeds[slot] = stream.id;
                            feedStreams[stream.id].slot = slot;
                            feedStreams[stream.id].remoteVideos = 0;

                            this.callbacks.newStream(slot, stream.display);

                            break;
                        }
                    }
                }

                newStreams.push({
                    feed: stream.id,	// This is mandatory
                    mid: stream.mid		// This is optional (all streams, if missing)
                });

                if(!subscriptions[stream.id]) {
                    subscriptions[stream.id] = {};
                }
                subscriptions[stream.id][stream.mid] = true;
            }
        }

        return [newStreams, oldStreams];
    }

    _sendWebRTCAnswer = (jsep) => {
        this.remoteFeed.createAnswer({
            jsep,
            success: (jsep) => {
                Janus.debug("Got SDP!");
                Janus.debug(jsep);
        
                this.remoteFeed.send({
                    message: {
                        request: "start",
                        room: this.roomName,
                    },
                    jsep
                });
            },
            error: (error) => Janus.error("WebRTC error:", error),
        });
    }

    _unsubscribeFrom = (id) => {
        let feed = feedStreams[id];
        if(!feed)
            return;
        Janus.debug("Feed " + id + " (" + feed.display + ") has left the room, detaching");
        
        this.callbacks.unpublished(feed.slot);

        delete feeds[feed.slot];
        feeds.slot = 0;
        delete feedStreams[id];
    
        let unsubscribe = {
            request: "unsubscribe",
            streams: [{ feed: id }]
        };

        if(this.remoteFeed != null) {
            this.remoteFeed.send({ message: unsubscribe });
        }
        delete subscriptions[id];
    }

    _handleNewFeeds = (feeds) => {
        Janus.debug("Got a list of available publishers/feeds:", feeds);

        const sources = [];
        for(const feed of feeds) {
            if(feed.dummy) {
                continue;
            }

            const {
                id,
                display,
                streams,
            } = feed;

            for(const stream of streams) {
                stream.id = id;
                stream.display = display;
            }
            const slot = feedStreams[id] ? feedStreams[id].slot : null;
            const remoteVideos = feedStreams[id] ? feedStreams[id].remoteVideos : 0;
            feedStreams[id] = {
                id,
                display,
                streams,
                slot,
                remoteVideos,
            }

            Janus.debug("  >> [" + id + "] " + display + ":", streams);

            sources.push(streams);
        }

        if(sources.length > 0) {
            this._subscribeTo(sources);
        }
    }

    _removeLocalTrack = (track) => {
        // Track removed, get rid of the stream and the rendering
        const stream = localTracks[trackId];
        if (stream) {
            try {
                let tracks = stream.getTracks();
                for(const track of tracks) {
                    if(track)
                        track.stop();
                }
            } catch(e) {}
        }

        if (track.kind === "video") {
            this.callbacks.localVideoTrackRemoved(trackId);

            localVideos -= 1;
            if (localVideos === 0) {
                this.callbacks.noMoreLocalVideoTracks();
            }
        }

        delete localTracks[trackId];
    }

    _handleVideoRoomMessage = (msg, videoroomMessage) => {
        switch (videoroomMessage) {
            case 'joined':
                // Publisher/manager created, negotiate WebRTC and attach to existing feeds, if any
                this.id = msg.id;
                this.privateId = msg.private_id;

                Janus.log(`Successfully joined room ${msg.room} with ID ${this.id}`);

                switch(this.userType) {
                    case "translator":
                        this._publishOwnFeed(true, false);
                        break;
                    case "respondee":
                        this._publishOwnFeed(false);
                        break;
                    case "recorder":
                        this.callbacks.joinedAsSubscriber();
                        break;
                    default:
                        this._publishOwnFeed(true);
                }

                // Any new feed to attach to?
                if(msg.publishers) {
                    this._handleNewFeeds(msg.publishers);
                }
                break;

            case 'destroyed':
                Janus.warn("The room has been destroyed!");
                break;

            case 'event':
                // info about all current streams
                if(msg.streams) {
                    for(const stream of msg.streams) {
                        stream.id = this.id;
                        stream.display = this.username;
                    }

                    feedStreams[this.id] = {
                        id: this.id,
                        display: this.username,
                        streams: msg.streams,
                    }

                } else if(msg.publishers) {
                    this._handleNewFeeds(msg.publishers);

                } else if(msg.leaving) {
                    // One of the publishers has gone away?
                    let leaving = msg["leaving"];
                    Janus.log("Publisher left: " + leaving);
                    this._unsubscribeFrom(leaving);

                } else if(msg.unpublished) {
                    const unpublished = msg.unpublished;
                    Janus.log("Publisher left: " + unpublished);

                    if(unpublished === 'ok') {
                        // That's us
                        sfutest.hangup();
                        return;
                    }

                    this._unsubscribeFrom(unpublished);

                } else if(msg.error) {
                    if(msg.error_code === 426) {
                        Janus.error("No such room: ", this.roomName);
                    } else {
                        Janus.error(msg.error);
                    }
                }
        }
    }
}
/*
const janusVideoRoomAdapter = new JanusVideoRoomAdapter({
    roomName: Utils.getQueryStringValue("room") !== ""
        ? parseInt(Utils.getQueryStringValue("room"))
        : 1234,
    subscriber_mode: Utils.getQueryStringValue("subscriber-mode") === "yes"
        || Utils.getQueryStringValue("subscriber-mode") === "true",
    use_msid: Utils.getQueryStringValue("msid") === "yes"
        || Utils.getQueryStringValue("msid") === "true",
}, {
    janusStarting: () => $(this).attr('disabled', true).unbind('click'),
    muteStateChanged: (muted) => $('#mute').html(muted ? "Unmute" : "Mute"),
    unpublishingOwnFeed: () => $('#unpublish').attr('disabled', true).unbind('click'),
    publishingOwnFeed: () => $('#publish').attr('disabled', true).unbind('click'),
    createOfferFailed: () => $('#publish').removeAttr('disabled').click(() => janusVideoRoomAdapter._publishOwnFeed(true)),
    getUsername: () => $('#username').val(),
    videoStreamRejected: () => {
        $('#myvideo').hide();
        $('#videolocal').append(
            '<div class="no-video-container">' +
                '<i class="fa fa-video-camera fa-5 no-video-icon" style="height: 100%;"></i>' +
                '<span class="no-video-text" style="font-size: 16px;">Video rejected, no webcam</span>' +
            '</div>');
    },
    videoPluginAttachSuccess: () => {
        $('#register').click(janusVideoRoomAdapter.registerUsername);
        $('#stop').click(janusVideoRoomAdapter.stopJanus);
    },
    peerConnectionStateChanged: (on) => {
        $("#videolocal").parent().parent().unblock();
        if(!on)
            return;
        $('#publish').remove();
    },
    localVideoControlsCanBeEnabled: () => {
        $('#videos').removeClass('hide').show();
        if($('#mute').length === 0) {

            $('#videolocal').append('<button class="btn btn-warning btn-xs" id="mute" style="position: absolute; bottom: 0px; left: 0px; margin: 15px;">Mute</button>');
            $('#mute').click(janusVideoRoomAdapter.toggleMute);

            $('#videolocal').append('<button class="btn btn-warning btn-xs" id="unpublish" style="position: absolute; bottom: 0px; right: 0px; margin: 15px;">Unpublish</button>');
            $('#unpublish').click(janusVideoRoomAdapter.unpublishOwnFeed);
        }
    },
    localStreamUnpublished: () => {
        $('#videolocal').html('<button id="publish" class="btn btn-primary">Publish</button>');
        $('#publish').click(() => janusVideoRoomAdapter._publishOwnFeed(true));
        $("#videolocal").parent().parent().unblock();
    },
    unpublished: (slot) => {
        $('#remote' + slot).empty().hide();
        $('#videoremote' + slot).empty();
    },
    joinedAsSubscriber: () => {
        $('#videojoin').hide();
        $('#videos').removeClass('hide').show();
    },
    newStream: (slot, streamName) => {
        $('#remote' + slot).removeClass('hide').html(Utils.escapeXmlTags(streamName)).show();
    },
    publishingStream: () => {
        $("#videolocal").parent().parent().block({
            message: '<b>Publishing...</b>',
            css: {
                border: 'none',
                backgroundColor: 'transparent',
                color: 'white'
            }
        });
    },
    localVideoTrackRemoved: (trackId) => $('#myvideo' + trackId).remove(),
    noMoreLocalVideoTracks: () => {
        // No video, at least for now: show a placeholder
        if($('#videolocal .no-video-container').length === 0) {
            $('#videolocal').append(
                '<div class="no-video-container">' +
                    '<i class="fa fa-video-camera fa-5 no-video-icon"></i>' +
                    '<span class="no-video-text">No webcam available</span>' +
                '</div>');
        }
    },
    localVideoTrackAdded: (trackId) => {
        $('#videolocal .no-video-container').remove();
        $('#videolocal').append('<video class="rounded centered" id="myvideo' + trackId + '" width=100% autoplay playsinline muted="muted"/>');
    },
    getLocalVideoElement: (trackId) => $('#myvideo' + trackId).get(0),
    remoteStreamUnpublished: (slot) => $('#videoremote' + slot).empty(),
    remoteVideoTrackRemoved: (slot, mid) => $('#remotevideo' + slot + '-' + mid).remove(),
    noMoreRemoteVideoTracks: (slot) => {
        // No video, at least for now: show a placeholder
        if($('#videoremote' + slot + ' .no-video-container').length === 0) {
            $('#videoremote' + slot).append(
                '<div class="no-video-container">' +
                    '<i class="fa fa-video-camera fa-5 no-video-icon"></i>' +
                    '<span class="no-video-text">No remote video available</span>' +
                '</div>');
        }
    },
    remoteAudioTrackAdded: (slot, mid) => $('#videoremote' + slot).append('<audio class="hide" id="remotevideo' + slot + '-' + mid + '" autoplay playsinline/>'),
    remoteVideoTrackAdded: (slot, mid) => {
        $('#videoremote' + slot + ' .no-video-container').remove();
        $('#videoremote' + slot).append('<video class="rounded centered" id="remotevideo' + slot + '-' + mid + '" width=100% autoplay playsinline/>');
    },
    getRemoteVideoElement: (slot, mid) => $('#remotevideo' + slot + '-' + mid).get(0),
    getRemoteVideoElements: (slot, mid) => $('#remotevideo' + slot + '-' + mid),
});

Janus.init({
    debug: "all",
    callback: janusVideoRoomAdapter.startJanus,
});
*/