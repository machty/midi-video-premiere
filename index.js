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
                    data: "\u0000"
                },
                {
                    deltaTime: 0,
                    type: 255,
                    metaType: 88,
                    data: [1, 2, 36, 8]
                },
                {
                    deltaTime: 0,
                    type: 255,
                    metaType: 88,
                    data: [1, 2, 36, 8]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [42, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [42, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [42, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [38, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [38, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [42, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [42, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [36, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [36, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [42, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [36, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [42, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [38, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [38, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [42, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [42, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [42, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 24,
                    type: 9,
                    channel: 0,
                    data: [36, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 121]
                },
                {
                    deltaTime: 24,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [42, 121]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [42, 121]
                },
                {
                    deltaTime: 12,
                    type: 9,
                    channel: 0,
                    data: [38, 122]
                },
                {
                    deltaTime: 0,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [38, 64]
                },
                {
                    deltaTime: 36,
                    type: 9,
                    channel: 0,
                    data: [42, 122]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 36,
                    type: 9,
                    channel: 0,
                    data: [42, 122]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [42, 122]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [42, 122]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [42, 122]
                },
                {
                    deltaTime: 12,
                    type: 9,
                    channel: 0,
                    data: [38, 124]
                },
                {
                    deltaTime: 0,
                    type: 8,
                    channel: 0,
                    data: [42, 64]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [38, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [38, 124]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [38, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [38, 124]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [38, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [38, 124]
                },
                {
                    deltaTime: 12,
                    type: 9,
                    channel: 0,
                    data: [36, 124]
                },
                {
                    deltaTime: 0,
                    type: 8,
                    channel: 0,
                    data: [38, 64]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 124]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 124]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 124]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 124]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 124]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 124]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 124]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [38, 124]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [38, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [38, 124]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [38, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [38, 124]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [38, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [38, 124]
                },
                {
                    deltaTime: 12,
                    type: 9,
                    channel: 0,
                    data: [36, 123]
                },
                {
                    deltaTime: 0,
                    type: 8,
                    channel: 0,
                    data: [38, 64]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 123]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 123]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [36, 123]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [36, 64]
                },
                {
                    deltaTime: 0,
                    type: 9,
                    channel: 0,
                    data: [38, 124]
                },
                {
                    deltaTime: 12,
                    type: 8,
                    channel: 0,
                    data: [38, 64]
                },
                {
                    deltaTime: 0,
                    type: 255,
                    metaType: 47
                },
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
var BPM = 100;
var BEATS_PER_SECOND = BPM / 60;
var PULSES_PER_QUARTER_NOTE = midi.timeDivision;
var BEATS_PER_MEASURE = 4; // TODO: make this take into account time signature events?
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
    var seconds = time / PULSES_PER_QUARTER_NOTE / BEATS_PER_SECOND;
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
var STARTING_OFFSET = 1; // seconds
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
// resolves overlaps, computes before/afterSeconds on clips
function scheduleVirtualClips(virtualClips) {
    for (var index = 0; index < virtualClips.length; index++) {
        var clip0 = virtualClips[index];
        var clip1 = virtualClips[index + 1];
        if (clip1) {
            // limit the end time of clip0;
            // we don't know the real end time.
            var timeBetweenStrikes = clip1.strikeAtSeconds - clip0.strikeAtSeconds;
            var clip1videoStart = clip1.strikeAtSeconds - clip1.beforeSeconds;
            var midpointBetweenStrikes = clip0.strikeAtSeconds + timeBetweenStrikes / 2;
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
}
function assembleVirtualTrack(instruments) {
    var allVirtualClips = [];
    forEach(instruments, function (instrument) {
        var midiStrikes = strikesByInstrument[instrument.shortName];
        var virtualClips = map(midiStrikes, function (midiStrike) {
            var newClip = new VirtualClipInstance(midiStrike, instrument.videoStrikes[0]);
            return newClip;
        });
        allVirtualClips.push.apply(allVirtualClips, virtualClips);
    });
    allVirtualClips = allVirtualClips.sort(function (a, b) {
        if (a.strikeAtSeconds < b.strikeAtSeconds) {
            return -1;
        }
        else if (a.strikeAtSeconds > b.strikeAtSeconds) {
            return 1;
        }
        else {
            return 0;
        }
    });
    scheduleVirtualClips(allVirtualClips);
    var virtualTrack = {
        virtualClips: allVirtualClips
    };
    return virtualTrack;
}
var virtualTracks = [
    assembleVirtualTrack([bassDrum, snareDrum, hiHatClosed]),
];
// Create a VirtualTrack for each instrument.
// Implement simple intersection-resolution algo.
// Note: even though we're scoping to a single instrument's video tracks, we should
// generalize this so that the clips stitched-together could come from a variety of instruments.
// const virtualTracks: VirtualTrack[] = map(
//   [bassDrum, hiHatClosed, snareDrum],
//   (instrument: Instrument) => {
//     const midiStrikes = strikesByInstrument[instrument.shortName];
//     const virtualClips: VirtualClipInstance[] = map(
//       midiStrikes,
//       (midiStrike: MidiStrike) => {
//         const newClip: VirtualClipInstance = new VirtualClipInstance(
//           midiStrike,
//           instrument.videoStrikes[0]
//         );
//         return newClip;
//       }
//     );
//     scheduleVirtualClips(virtualClips);
//     const virtualTrack: VirtualTrack = {
//       virtualClips: virtualClips,
//     };
//     return virtualTrack;
//   }
// );
forEach(virtualTracks, function (virtualTrack, trackIndex) {
    var videoTrack = videoTracks[trackIndex];
    forEach(virtualTrack.virtualClips, function (virtualClip, clipIndex) {
        var instrument = virtualClip.midiStrike.instrument;
        var clip = virtualClip.videoStrike.clip;
        // We're intentionally minimizing our interactions with the clip once
        // we've inserted into the sequence. The plan is:
        // - Insert the clip right when it's supposed to begin
        // - Adjust the clip's in-time in case we had to adjust the beforeTime
        var clipStart = virtualClip.strikeAtSeconds -
            virtualClip.beforeSeconds +
            STARTING_OFFSET;
        var clipEnd = virtualClip.strikeAtSeconds +
            virtualClip.afterSeconds +
            STARTING_OFFSET;
        var duration = clipEnd - clipStart;
        $.writeln("".concat(instrument.name, ": midi strike: ").concat(clipStart, " - ").concat(clipEnd, ", duration: ").concat(duration));
        videoTrack.overwriteClip(clip, clipStart);
        // grab the clip instance we just added to the sequence
        var clipInstance = videoTrack.clips[clipIndex];
        var delta = CLIP_SECONDS_BEFORE_STRIKE - virtualClip.beforeSeconds;
        if (delta !== 0) {
            // delta is only ever positive.
            // when it is, we need to add it to the inPoint so that the clip starts _later_
            clipInstance.inPoint = clipInstance.inPoint.seconds + delta;
        }
    });
});
