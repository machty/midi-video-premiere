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
var midi = {
    formatType: 0,
    tracks: 1,
    track: [
        {
            event: [
                {
                    deltaTime: 0,
                    type: 255,
                    metaType: 3,
                    data: "testeroony\u0000"
                },
                { deltaTime: 0, type: 255, metaType: 88, data: [4, 2, 36, 8] },
                { deltaTime: 0, type: 255, metaType: 88, data: [4, 2, 36, 8] },
                { deltaTime: 0, type: 9, channel: 0, data: [36, 68] },
                { deltaTime: 0, type: 9, channel: 0, data: [42, 69] },
                { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
                { deltaTime: 0, type: 8, channel: 0, data: [42, 64] },
                { deltaTime: 24, type: 9, channel: 0, data: [42, 69] },
                { deltaTime: 24, type: 8, channel: 0, data: [42, 64] },
                { deltaTime: 24, type: 9, channel: 0, data: [38, 69] },
                { deltaTime: 0, type: 9, channel: 0, data: [42, 69] },
                { deltaTime: 24, type: 8, channel: 0, data: [38, 64] },
                { deltaTime: 0, type: 8, channel: 0, data: [42, 64] },
                { deltaTime: 24, type: 9, channel: 0, data: [42, 70] },
                { deltaTime: 24, type: 8, channel: 0, data: [42, 64] },
                { deltaTime: 24, type: 9, channel: 0, data: [36, 127] },
                { deltaTime: 0, type: 9, channel: 0, data: [42, 127] },
                { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
                { deltaTime: 0, type: 8, channel: 0, data: [42, 64] },
                { deltaTime: 24, type: 9, channel: 0, data: [36, 127] },
                { deltaTime: 0, type: 9, channel: 0, data: [42, 127] },
                { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
                { deltaTime: 0, type: 9, channel: 0, data: [36, 127] },
                { deltaTime: 0, type: 8, channel: 0, data: [42, 64] },
                { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
                { deltaTime: 0, type: 9, channel: 0, data: [38, 127] },
                { deltaTime: 0, type: 9, channel: 0, data: [42, 127] },
                { deltaTime: 24, type: 8, channel: 0, data: [38, 64] },
                { deltaTime: 0, type: 8, channel: 0, data: [42, 64] },
                { deltaTime: 24, type: 9, channel: 0, data: [42, 127] },
                { deltaTime: 24, type: 8, channel: 0, data: [42, 64] },
                { deltaTime: 0, type: 255, metaType: 47 },
            ]
        },
    ],
    timeDivision: 96
};
;
var instruments = {
    36: {
        name: "bass drum"
    },
    38: {
        name: "snare"
    },
    42: {
        name: "closed hi-hat"
    }
};
// deltaTime = 24 is a sixteenth note.
var bpm = 100;
// we insert by time, so we need something that'll just
// bpm2wat
var strikes = [];
var track = midi.track[0];
var time = 0;
for (var index = 0; index < track.event.length; index++) {
    var event = track.event[index];
    time += event.deltaTime;
    if (event.type !== 9) {
        // filter out anything but note-on
        continue;
    }
    var note = event.data[0];
    var velocity = event.data[1];
    var instrument = instruments[note];
    if (instrument) {
        $.writeln("".concat(instrument.name, " playing at time ").concat(time));
        strikes.push({ seconds: 123, velocity: velocity, instrument: instrument });
    }
}
// OK now we have strikes.
// They may overlap. There are many ways to "solve" these constraints with editing.
// For now we'll do one instrument per.

// bass drum for now




debugger;
// OK... sooooooo
// we have midi data. but Ableton doesn't seem to export the tempo of the track.
// that's fine we can just write it here.
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
// marker.start.seconds
videoTrack.insertClip(clip, 1);
videoTrack.insertClip(clip, 2);
videoTrack.insertClip(clip, 4);
// videoTrack.insertClip(trackNr, trackNr);
