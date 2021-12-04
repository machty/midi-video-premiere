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
function map(array, callback) {
    var ret = [];
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        ret.push(callback(element));
    }
    return ret;
}
var forEach = map; // lazy
function get(rootObject, path) {
    var object = rootObject;
    var parts = path.split('.');
    for (var index = 0; index < parts.length; index++) {
        var part = parts[index];
        object = object[part];
    }
    return object;
}
function indexBy(array, key) {
    var ret = {};
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        var value = get(element, key);
        ret[value] = element;
    }
    return ret;
}
function groupBy(array, key) {
    var ret = {};
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        var value = get(element, key);
        if (!ret[value]) {
            ret[value] = [];
        }
        ret[value].push(element);
    }
    return ret;
}
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
;
function createInstrument(name, shortName) {
    return {
        name: name,
        shortName: shortName,
        videoStrikes: []
    };
}
var bassDrum = createInstrument("bass drum", "bd");
var snareDrum = createInstrument("snare", "sn");
var hiHatClosed = createInstrument("closed hi-hat", "hhc");
var instruments = [
    bassDrum,
    snareDrum,
    hiHatClosed
];
var instrumentsByShortName = indexBy(instruments, 'shortName');
var instrumentsByMidiNote = {
    36: bassDrum,
    38: snareDrum,
    42: hiHatClosed
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
    var instrument = instrumentsByMidiNote[note];
    if (!instrument) {
        // no midi note mapping for this instrument
        continue;
    }
    $.writeln("".concat(instrument.name, " playing at time ").concat(time));
    strikes.push({ seconds: 123, velocity: velocity, instrument: instrument });
}
// OK now we have strikes, split them by instrument for now
var strikeByInstrument = groupBy(strikes, 'instrument.shortName');
// Let's schedule a bunch of bass drum hits.
// We need to specify where we can find all the hits.
// The ideal is that every clip has markers for each thing.
// maybe we say marker descriptions are CSVs
var trackNr = 0;
var clipNr = 0;
var seq = app.project.activeSequence;
var videoTracks = seq.videoTracks;
var videoTrack = videoTracks[trackNr];
var clips = videoTrack.clips;
var videoClip = videoTrack.clips[clipNr];
// Get a list of all the clips that are in the project panel
var availableClips = app.project.rootItem.children;
var _loop_1 = function (ci) {
    var clip = availableClips[ci];
    var markers = clip.getMarkers();
    var _loop_2 = function (mi) {
        var marker = markers[mi];
        if (!marker.comments) {
            return "continue";
        }
        var lines = marker.comments.split("\n");
        forEach(lines, function (line) {
            var _a = line.split(','), shortName = _a[0], velocity = _a[1], description = _a[2];
            var instrument = instrumentsByShortName[shortName];
            if (instrument) {
                instrument.videoStrikes.push({
                    clip: clip,
                    marker: marker
                });
            }
        });
    };
    for (var mi = 0; mi < markers.numMarkers; mi++) {
        _loop_2(mi);
    }
};
for (var ci = 0; ci < availableClips.numItems; ci++) {
    _loop_1(ci);
}
// $.writeln(marker.name);
// marker.start.seconds
// videoTrack.insertClip(clip, 1);
// videoTrack.insertClip(clip, 2);
// videoTrack.insertClip(clip, 4);
// videoTrack.insertClip(trackNr, trackNr);
