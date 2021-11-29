/// <reference types="types-for-adobe/Premiere/2018"/>
function map(array, callback) {
    var out = [];
    for (var index = 0; index < array.length; index++) {
        out.push(array[index]);
    }
    return out;
}
$.writeln(map([1, 2, 3], function (a) { return 123; }));
var trackNr = 0;
var clipNr = 0;
var seq = app.project.activeSequence;
var videoTracks = seq.videoTracks;
var videoTrack = videoTracks[trackNr];
var videoClip = videoTrack.clips[clipNr];
// Get a list of all the clips that are in the project panel
var availableClips = app.project.rootItem.children;
var clip0 = availableClips[0];
var a = 123;
var b = a + 123;
// $.writeln("HAHAHA123");
debugger;
