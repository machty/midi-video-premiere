/// <reference types="types-for-adobe/Premiere/2018"/>
function map(array, callback) {
    var ret = [];
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        ret.push(callback(element, index));
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
// function bpm2wat
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
    // $.writeln(`${instrument.name} playing at time ${time}`);
    // 24 * 4 = number
    // 96 beats per second
    var seconds = time / 96;
    strikes.push({ seconds: seconds, velocity: velocity, instrument: instrument });
}
var seq = app.project.activeSequence;
var videoTracks = seq.videoTracks;
var availableClips = app.project.rootItem.children;
for (var ci = 0; ci < availableClips.numItems; ci++) {
    var clip = availableClips[ci];
    var _a = clip.name.split(','), shortName = _a[0], velocity = _a[1], description = _a[2];
    var instrument = instrumentsByShortName[shortName];
    if (!instrument) {
        continue;
    }
    var marker = clip.getMarkers()[0];
    instrument.videoStrikes.push({
        clip: clip,
        marker: marker
    });
}
var strikesByInstrument = groupBy(strikes, 'instrument.shortName');
var startingOffset = 5; // seconds
var clipFramesBeforeMarker = 10; // hacky, but sidesteps the issue of markers having negative times
var fps = 24;
var clipSecondsBeforeBuffer = clipFramesBeforeMarker / fps;
// forEach([bassDrum, snareDrum], (instrument: Instrument, trackIndex: number) => {
forEach([bassDrum], function (instrument, trackIndex) {
    var videoTrack = videoTracks[trackIndex];
    var videoStrike = instrument.videoStrikes[0];
    var clip = videoStrike.clip, marker = videoStrike.marker;
    // clip.setStartTime()
    // marker.start.sec
    var midiStrikes = strikesByInstrument[instrument.shortName];
    if (!midiStrikes) {
        throw "wat";
    }
    forEach(midiStrikes, function (midiStrike, index) {
        // marker.start.seconds is negative for subclips???
        // so we use clipSecondsBeforeBuffer
        // const insertTime = startingOffset + midiStrike.seconds - marker.start.seconds;
        var insertTime = startingOffset + midiStrike.seconds - clipSecondsBeforeBuffer;
        videoTrack.overwriteClip(clip, insertTime);
        $.writeln("".concat(instrument.name, ": midi strike: ").concat(insertTime));
    });
});
