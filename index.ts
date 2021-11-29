/// <reference types="types-for-adobe/Premiere/2018"/>

function map(array, callback) {
    const out = [];
    for (let index = 0; index < array.length; index++) {
        out.push(callback(array[index]));
    }
    return out;
}

$.writeln(
    map([1,2,3], a => 123)
)

const trackNr = 0;
const clipNr = 0;

const seq = app.project.activeSequence;
const videoTracks = seq.videoTracks;
const videoTrack = videoTracks[trackNr];
const videoClip = videoTrack.clips[clipNr];

// Get a list of all the clips that are in the project panel
const availableClips = app.project.rootItem.children;
const clip0 = availableClips[0];

const a = 123;
const b = a + 123;

// $.writeln("HAHAHA123");

debugger;


