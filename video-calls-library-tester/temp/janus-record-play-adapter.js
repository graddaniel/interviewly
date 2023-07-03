// We import the settings.js file to know which address we should contact
// to talk to Janus, and optionally which STUN/TURN servers should be
// used as well. Specifically, that file defines the "server" and
// "iceServers" properties we'll pass when creating the Janus session.

/* global iceServers:readonly, Janus:readonly, server:readonly */
import Janus from './janus';

var janus = null;
var recordplay = null;
var opaqueId = "recordplaytest-"+Janus.randomString(12);

var localTracks = {}, localVideos = 0,
	remoteTracks = {}, remoteVideos = 0;
var spinner = null;
var bandwidth = 1024 * 1024;

var recording = false;
var playing = false;
var recordingId = null;
var selectedRecording = null;
var selectedRecordingInfo = null;
let recordingsList = [];

let callbacks = {};

Janus.init({
	debug: 'all',
	callback: () => {
		if (!Janus.isWebrtcSupported()) {
			Janus.error('No WebRTC support... ');
			return;
		}

		janus = new Janus({
			token: 'token1234',
			server: 'http://localhost:8088/janus',
			iceServers: null,
			// Should the Janus API require authentication, you can specify either the API secret or user token here too
			//		token: "mytoken",
			//	or
			//		apisecret: "serversecret",
			success: () => {
				janus.attach({
					plugin: "janus.plugin.recordplay",
					opaqueId: opaqueId,
					success: (pluginHandle) => {
						recordplay = pluginHandle;
						Janus.log(`Plugin attached! ${recordplay.getPlugin()} id=${recordplay.getId()}`);

						updateRecsList();
					},
					error: (error) => Janus.error(`  -- Error attaching plugin... ${error}`),
					consentDialog: (isOn) => {
						// callback trigger consent dialog
					},
					iceState: (state) => Janus.log("ICE state changed to " + state),
					mediaState: (medium, on, mid) => Janus.log(`Janus ${(on ? "started" : "stopped")} receiving our ${medium} (mid=${mid})`),
					webrtcState: (on) => Janus.log(`Janus says our WebRTC PeerConnection is ${(on ? "up" : "down")} now`),
					slowLink: (uplink, lost, mid) => Janus.warn(`Janus reports problems ${(uplink ? "sending" : "receiving")} packets on mid ${mid} (${lost} lost packets)`),
					onmessage: (msg, jsep) => {
						Janus.debug(` ::: Got a message ::: ${msg}`);
						const { result } = msg;
						if (result) {
							if(!result.status) {
								return;
							}

							const event = result.status;
							if (event === 'preparing' || event === 'refreshing') {
								Janus.log('Preparing the recording playout');

								recordplay.createAnswer({
									jsep,
									// We only specify data channels here, as this way in
									// case they were offered we'll enable them. Since we
									// don't mention audio or video tracks, we autoaccept them
									// as recvonly (since we won't capture anything ourselves)
									tracks: [{ type: 'data' }], //TODO check if record/play works with empty tracks here
									success: (jsep) => {
										Janus.debug(`Got SDP! ${jsep}`);
										recordplay.send({
											message: {
												request: "start"
											},
											jsep,
										});
									},
									error: (error) => Janus.error(`WebRTC error: , ${error}`),
								});
								
								const { warning } = result;
								if(warning) {
									Janus.warn(warning)
								}

							} else if (event === 'recording') {
								// Got an ANSWER to our recording OFFER
								if(jsep) {
									recordplay.handleRemoteJsep({ jsep: jsep });
								}

								const { id } = result;
								if (id) {
									Janus.log(`The ID of the current recording is ${id}`);
									recordingId = id;
								}
							} else if(event === 'playing') {
								Janus.log('Playout has started!');

							} else if(event === 'stopped') {
								Janus.log('Session has stopped!');
								const { id } = result;
								if(recordingId) {
									if(recordingId !== id) {
										Janus.warn('This is not our recording - received Stopped event for a recording');
										return;
									}

									Janus.log('Recording completed! Check the list of recordings to replay it.');
									callbacks.onRecordingStopped();
								}

								if(selectedRecording && selectedRecording !== id) {
									Janus.warn('This is not our recording - received Stopped event for a playout');
									return;
								}

								recordingId = null;
								recording = false;
								playing = false;
								recordplay.hangup();

								// callback onRecordingStopped

								updateRecsList();
							}
						} else {
							const { error } = msg;

							Janus.error(error);

							// callback onErrorMessage/terminateStuff

							recording = false;
							playing = false;
							recordplay.hangup();

							updateRecsList();
						}
					},
					onlocaltrack: function(track, on) {
						if(playing === true) {
							return;
						}

						Janus.debug(`Local track ${(on ? "added" : "removed")} : ${track}`);
						// We use the track ID as name of the element, but it may contain invalid characters
						const trackId = track.id.replace(/[{}]/g, "");
						if (!on) {
							const stream = localTracks[trackId];
							if(stream) {
								try {
									const tracks = stream.getTracks();
									for(const track in tracks) {
										if (track) {
											track.stop();
										}
									}
								} catch(e) {}
							}

							if(track.kind === "video") {
								// callback onLocalVideoTrackRemoved
								localVideos--;
								if(localVideos === 0) {
									// callback noLocalVideosAvailable
								}
							}
							delete localTracks[trackId];
							return;
						}

						// If we're here, a new track was added
						let stream = localTracks[trackId];
						if(stream) {
							// We've been here already
							return;
						}

						callbacks.onRecordingStarted();
						if(track.kind === "audio") {
							// We ignore local audio tracks, they'd generate echo anyway
							if(localVideos === 0) {
								// callback noLocalVideosAvailable
							}
						} else {
							localVideos++;
							const stream = new MediaStream([track]);
							localTracks[trackId] = stream;

							Janus.log("Created local stream:", stream);
							callbacks.onLocalVideoTrackAdded(track, () => {
								Janus.attachMediaStream(callbacks.getLocalVideoElement(trackId), stream);
							})
						}

						if(
							recordplay.webrtcStuff.pc.iceConnectionState !== "completed" &&
							recordplay.webrtcStuff.pc.iceConnectionState !== "connected"
						) {
							//callback show publishing status
						}
					},
					onremotetrack: (track, mid, on, metadata) => {
						if (playing === false) {
							return;
						}

						Janus.debug(`Remote track (mid=${mid}) ${(on ? "added" : "removed")} ${(metadata ? `(${metadata.reason})` : "")} : ${track}`);
						if(!on) {
							// callback onRemoteVideoTrackRemoved(mid)
							if(track.kind === "video") {
								remoteVideos--;
								if(remoteVideos === 0) {
									// callback no remote videos available
								}
							}

							delete remoteTracks[mid];
							return;
						}

						// If we're here, a new track was added
						// callback displayTrackInfo(selectedRecordingInfo)

						if(track.kind === "audio") {
							const stream = new MediaStream([track]);
							remoteTracks[mid] = stream;

							Janus.log(`Created remote audio stream: ${stream}`);

							callbacks.onRemoteAudioTrackAdded(track, () => {
								Janus.attachMediaStream(callbacks.getRemoteAudioElement(mid), stream);
							});

							if(remoteVideos === 0) {
								//callback noVideosAvailable
							}

						} else {
							remoteVideos++;
							//callback videosAvailable

							const stream = new MediaStream([track]);
							remoteTracks[mid] = stream;

							Janus.log(`Created remote video stream: ${stream}`);

							callbacks.onRemoteVideoTrackAdded(track, () => {
								Janus.attachMediaStream(callbacks.getRemoteVideoElement(mid), stream);
							});

							// removed resolution display and update
						}
					},
					oncleanup: () => {
						Janus.log(' ::: Got a cleanup notification :::');

						if (spinner) {
							spinner.stop();
						}

						spinner = null;
						if (recordplay.bitrateTimer) {
							clearInterval(recordplay.bitrateTimer);
						}

						delete recordplay.bitrateTimer;

						recording = false;
						playing = false;

						// callback on cleanup

						localTracks = {};
						localVideos = 0;
						remoteTracks = {};
						remoteVideos = 0;

						updateRecsList();
					}
				});
			},
			error: function(error) {
				Janus.error(error);
				window.alert(error);
				window.location.reload();
			},
			destroyed: function() {
				window.location.reload();
			}
		});
}});

const stopJanus = () => {
	Janus.debug('Stopping Janus');

	janus.destroy();
}

const updateRecsList = () => {
	let body = { request: "list" };

	Janus.debug(`Sending list update message: ${body}`);

	recordplay.send({
		message: body,
		success: (result) => {
			// callback on list loading finished

			if(!result) {
				Janus.log("No recordings found.")
				return;
			}

			const { list } = result;
			if (list) {
				// callback allow recording and fetching rec list

				list.sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));

				Janus.debug("Got a list of available recordings:", list);

				recordingsList = list;
				callbacks.newRecordingsListReceived(list);
			}
		}
	});
}

const selectRecording = (id) => {
	const rec = recordingsList.find(recording => recording.id === id);
	if (!rec) {
		Janus.error(`Recording not found: ${id}`);
	}

	selectedRecording = rec.id;
	selectedRecordingInfo = `${rec.text} [${rec.date}]`
}

const startRecording = (recordingName) => {
	if (recording) {
		return;
	}

	recording = true;
	playing = false;

	if (!recordingName) {
		recording = false;
		return;
	}

	// callback: onRecording started

	// bitrate and keyframe interval can be set at any time:
	// before, after, during recording
	recordplay.send({
		message: {
			request: 'configure',
			'video-bitrate-max': bandwidth,		// a quarter megabit
			'video-keyframe-interval': 15000	// 15 seconds
		}
	});

	recordplay.createOffer({
		// We want sendonly audio and video, since we'll just send
		// media to Janus and not receive any back in this scenario
		// (uncomment the data track if you want to also record data
		// channels, even though there's no UI for that in the demo)
		tracks: [
			{ type: 'audio', capture: true, recv: false },
			{ type: 'video', capture: true, recv: false },
			//~ { type: 'data' },
		],
		success: (jsep) => {
			Janus.debug("Got SDP!", jsep);

			recordplay.send({
				message: {
					request: "record",
					name: recordingName
				},
				jsep,
			});
		},
		error: (error) => {
			Janus.error("WebRTC error...", error);

			recordplay.hangup();
		}
	});

	// callback enable play/stop elements
}

const pauseRecording = () => {
	recordplay.send({message: {request: 'pause'}});
}

const resumeRecording = () => {
	recordplay.send({message: {request: 'resume'}});
}

const startPlayout = () => {
	if (playing) {
		return;
	}

	recording = false;
	playing = true;

	if (!selectedRecording) {
		playing = false;
		return;
	}

	// callback: onPlayStarted

	recordplay.send({
		message: {
			request: "play",
			id: parseInt(selectedRecording),
		},
	});
}

const stopRecPlay = () => {
	recordplay.send({
		message: {
			request: "stop",
		},
	});
	recordplay.hangup();
}

const init = (cbs) => {
	callbacks = cbs;
	//onRecordingStarted
	//onRecordingStopped
	//onLocalVideoTrackAdded
	//getLocalVideoElement
	//onRemoteAudioTrackAdded
	//getRemoteAudioElement
	//onRemoteVideoAdded
	//getRemoteVideoElement
	//newRecordingsListReceived
}

export {
	stopJanus,
	selectRecording,
	startRecording,
	pauseRecording,
	resumeRecording,
	startPlayout,
	stopRecPlay,
	init,
}