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

function map(array: any[], callback) {
    const ret = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        ret.push(callback(element));
    }
    return ret;
}

const forEach = map; // lazy

function get(rootObject, path) {
    let object = rootObject;
    let parts = path.split('.');
    for (let index = 0; index < parts.length; index++) {
        const part = parts[index];
        object = object[part];
    }
    return object;
}

function indexBy(array: any[], key: string) {
    const ret = {};
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const value = get(element, key)
        ret[value] = element;
    }
    return ret;
}

function groupBy(array: any[], key: string) {
    const ret = {};
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const value = get(element, key)
        if (!ret[value]) {
            ret[value] = [];
        }
        ret[value].push(element);
    }
    return ret;
}

const midi = {
  formatType: 0,
  tracks: 1,
  track: [
    {
      event: [
        {
          deltaTime: 0,
          type: 255,
          metaType: 3,
          data: "testeroony\u0000",
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
      ],
    },
  ],
  timeDivision: 96,
};

interface Instrument {
    name: string;
    shortName: string;
    videoStrikes: VideoStrike[];
}

interface VideoStrike {
    clip: ProjectItem;
    marker: Marker;
};

interface MidiStrike {
    seconds: number;
    velocity: number;
    instrument: Instrument;
};

function createInstrument(name, shortName) {
    return {
        name,
        shortName,
        videoStrikes: []
    };
}

const bassDrum = createInstrument("bass drum", "bd");
const snareDrum = createInstrument("snare", "sn");
const hiHatClosed = createInstrument("closed hi-hat", "hhc");
const instruments: Instrument[] = [
    bassDrum,
    snareDrum,
    hiHatClosed
];
const instrumentsByShortName = indexBy(instruments, 'shortName');

const instrumentsByMidiNote = {
    36: bassDrum,
    38: snareDrum,
    42: hiHatClosed
}

// deltaTime = 24 is a sixteenth note.

const bpm = 100;
// we insert by time, so we need something that'll just
// bpm2wat


const strikes: MidiStrike[] = [];

const track = midi.track[0];
let time = 0;
for (let index = 0; index < track.event.length; index++) {
    const event = track.event[index];
    time += event.deltaTime;
    if (event.type !== 9) {
        // filter out anything but note-on
        continue;
    }
    const note = event.data[0];
    const velocity = event.data[1] as number;
    const instrument = instrumentsByMidiNote[note];
    if (!instrument) {
        // no midi note mapping for this instrument
        continue;
    }
    $.writeln(`${instrument.name} playing at time ${time}`);
    strikes.push({ seconds: 123, velocity, instrument });
}

// OK now we have strikes, split them by instrument for now
const strikeByInstrument = groupBy(strikes, 'instrument.shortName');

// Let's schedule a bunch of bass drum hits.
// We need to specify where we can find all the hits.
// The ideal is that every clip has markers for each thing.
// maybe we say marker descriptions are CSVs

const trackNr = 0;
const clipNr = 0;

const seq = app.project.activeSequence;
const videoTracks = seq.videoTracks;
const videoTrack = videoTracks[trackNr];
const clips = videoTrack.clips;
const videoClip = videoTrack.clips[clipNr];

// Get a list of all the clips that are in the project panel
const availableClips = app.project.rootItem.children;
for (let ci = 0; ci < availableClips.numItems; ci++) {
    const clip = availableClips[ci];
    const markers = clip.getMarkers();
    for (let mi = 0; mi < markers.numMarkers; mi++) {
        const marker: Marker = markers[mi];
        if (!marker.comments) { continue; }
        const lines = marker.comments.split("\n");
        forEach(lines, (line) => {
            const [shortName, velocity, description] = line.split(',');
            const instrument = instrumentsByShortName[shortName];
            if (instrument) {
                instrument.videoStrikes.push({
                    clip,
                    marker,
                })
            }
        });
    }
}

// $.writeln(marker.name);
// marker.start.seconds

// videoTrack.insertClip(clip, 1);
// videoTrack.insertClip(clip, 2);
// videoTrack.insertClip(clip, 4);
// videoTrack.insertClip(trackNr, trackNr);
