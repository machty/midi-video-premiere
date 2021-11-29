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
var trackNr = 0;
var clipNr = 0;
var seq = app.project.activeSequence;
var videoTracks = seq.videoTracks;
var videoTrack = videoTracks[trackNr];
var clips = videoTrack.clips;
var videoClip = videoTrack.clips[clipNr];
// $.writeln(`the clips`)
// $.writeln(
//     map(videoTrack.clips, c => c.name)
// )
// Get a list of all the clips that are in the project panel
var availableClips = app.project.rootItem.children;
var clip = availableClips[2];
var markers = clip.getMarkers();
var marker = markers[1];
$.writeln(marker.name);
debugger;
// videoTrack.insertClip(clip, 0);
// videoTrack.insertClip(trackNr, trackNr);
