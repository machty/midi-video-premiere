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
    var parts = path.split(".");
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
var instruments = [bassDrum, snareDrum, hiHatClosed];
var instrumentsByShortName = indexBy(instruments, "shortName");
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
    var _a = clip.name.split(","), shortName = _a[0], velocity = _a[1], description = _a[2];
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
var strikesByInstrument = groupBy(strikes, "instrument.shortName");
// Now that we have a database of video strikes to choose from, we need to
// assemble the video sequences according to the midi.
// There are lots of potential algorithms we could consider for doing this in the future.
// But for now, we're doing:
// - one video track per instrument
// - no transitions / effects
// - simply set the start/in/end points
// - in case of overlap, find the midpoint between first and second clip strikes and cut the end of the first clip there and start the second there.
var startingOffset = 5; // seconds
var CLIP_FRAMES_BEFORE_STRIKE = 10; // hacky, but sidesteps the issue of markers having negative times
var FPS = 24;
var CLIP_SECONDS_BEFORE_STRIKE = CLIP_FRAMES_BEFORE_STRIKE / FPS;
var VirtualClipInstance = /** @class */ (function () {
    function VirtualClipInstance(midiStrike, videoStrike) {
        this.midiStrike = midiStrike;
        this.videoStrike = videoStrike;
        this.strikeAtSeconds = midiStrike.seconds;
        this.beforeSeconds = CLIP_SECONDS_BEFORE_STRIKE;
        this.afterSeconds = 5;
    }
    return VirtualClipInstance;
}());
// Create a VirtualTrack for each instrument.
// Implement simple intersection-resolution algo.
// Note: even though we're scoping to a single instrument's video tracks, we should
// generalize this so that the clips stitched-together could come from a variety of instruments.
var virtualTracks = map([bassDrum], function (instrument) {
    var midiStrikes = strikesByInstrument[instrument.shortName];
    var virtualClips = map(midiStrikes, function (midiStrike) {
        var newClip = new VirtualClipInstance(midiStrike, instrument.videoStrikes[0]);
        return newClip;
    });
    for (var index = 0; index < virtualClips.length; index++) {
        var clip0 = virtualClips[index];
        var clip1 = virtualClips[index + 1];
        if (clip1) {
            // limit the end time of clip0;
            // we don't know the real end time.
            var timeBetweenStrikes = clip1.strikeAtSeconds - clip0.strikeAtSeconds;
            var clip1videoStart = clip1.strikeAtSeconds - clip1.beforeSeconds;
            var midpointBetweenStrikes = clip1.strikeAtSeconds + (timeBetweenStrikes / 2);
            if (clip1videoStart < midpointBetweenStrikes) {
                // If clip1's video starts before midpoint, then
                // make clip0 end at midpoint and and make clip1 start at midpoint
                clip0.afterSeconds = midpointBetweenStrikes - clip0.strikeAtSeconds;
                clip1.beforeSeconds = clip1.strikeAtSeconds - midpointBetweenStrikes;
            }
            else {
                // Otherwise, no need to change clip1's start time, but clip0 should end at clip0.start
                clip0.afterSeconds = clip1videoStart - clip0.strikeAtSeconds;
            }
        }
    }
    var virtualTrack = {
        virtualClips: virtualClips
    };
    return virtualTrack;
});
forEach(virtualTracks, function (virtualTrack, trackIndex) {
    var videoTrack = videoTracks[trackIndex];
    forEach(virtualTrack.virtualClips, function (virtualClip, clipIndex) {
        var instrument = virtualClip.midiStrike.instrument;
        var clip = virtualClip.videoStrike.clip;
        // disregard these errors; .start and the like are actually writeable
        var clipStart = virtualClip.strikeAtSeconds - virtualClip.beforeSeconds + startingOffset;
        var clipEnd = virtualClip.strikeAtSeconds + virtualClip.afterSeconds + startingOffset;
        // videoTrack.insertClip(clip, clipStart);
        // const clipInstance = videoTrack.clips[clipIndex] as TrackItem;
        // clipInstance.start = clipStart;
        // clipInstance.end = clipEnd;
        // clipInstance.name = `ALEX${clipIndex}`;
        var duration = clipEnd - clipStart;
        $.writeln("".concat(instrument.name, ": midi strike: ").concat(clipStart, " - ").concat(clipEnd, ", duration: ").concat(duration));
        // startingOffset + midiStrike.seconds - clipSecondsBeforeBuffer;
    });
});
//     // grab the clip instance we just added to the sequence
//     const clipInstance = videoTrack.clips[index] as TrackItem;
//     // modifies the inPoint _WITHIN_ the clip in seconds.
//     // so if you INCREASE it, the clip as presented in the sequence will move to the left.
//     // Note: this does NOT appear to mutate the origin clip in the project, just the clip instance.
//     // clipInstance.inPoint = 0.5;
//     // clipInstance.start = 1; // position the clip start at 1s in sequence
//     // clipInstance.end = 2; // position the clip end at 2s in sequence
//     // clipInstance.inPoint = 0.5;
