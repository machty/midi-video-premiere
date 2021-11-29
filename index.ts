/// <reference types="types-for-adobe/Premiere/2018"/>

// type ArrayIshOf<K> = {
//     length: number;
// };

// function map<K, lengthProp>(array: ArrayIshOf<K>, callback) : K[] {
//     const out = [];
//     for (let index = 0; index < array[lengthProp]; index++) {
//         out.push(callback(array[index]));
//     }
//     return out;
// }

const trackNr = 0;
const clipNr = 0;

const seq = app.project.activeSequence;
const videoTracks = seq.videoTracks;
const videoTrack = videoTracks[trackNr];
const clips = videoTrack.clips;
const videoClip = videoTrack.clips[clipNr];

// $.writeln(`the clips`)
// $.writeln(
//     map(videoTrack.clips, c => c.name)
// )

// Get a list of all the clips that are in the project panel
const availableClips = app.project.rootItem.children;
const clip = availableClips[2];
const markers = clip.getMarkers();
const marker: Marker = markers[1];
$.writeln(
    marker.name
);

debugger;
// videoTrack.insertClip(clip, 0);
// videoTrack.insertClip(trackNr, trackNr);
