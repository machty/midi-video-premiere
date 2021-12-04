/// <reference types="types-for-adobe/Premiere/2018"/>

function map(array: any[], callback) {
    const ret = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        ret.push(callback(element, index));
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
// function bpm2wat


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
    // 24 * 4 = number
    // 96 beats per second
    const seconds = time / 96;
    strikes.push({ seconds, velocity, instrument });
}


const trackNr = 0;
const clipNr = 0;

const seq = app.project.activeSequence;
const videoTracks = seq.videoTracks;

// Find all the instrument strike subclips
const availableClips = app.project.rootItem.children;
for (let ci = 0; ci < availableClips.numItems; ci++) {
    const clip = availableClips[ci];
    const [shortName, velocity, description] = clip.name.split(',');
    const instrument = instrumentsByShortName[shortName];
    if (!instrument) {
        continue;
    }

    const marker = clip.getMarkers()[0] as Marker;

    instrument.videoStrikes.push({
        clip,
        marker,
    })
}

const strikesByInstrument = groupBy(strikes, 'instrument.shortName');
const startingOffset = 5; // seconds

// forEach([bassDrum, snareDrum], (instrument: Instrument, trackIndex: number) => {
forEach([bassDrum], (instrument: Instrument, trackIndex: number) => {
    const videoTrack = videoTracks[trackIndex];
    const videoStrike = instrument.videoStrikes[0];
    const { clip, marker } = videoStrike;
    debugger;
    // marker.start.sec

    const midiStrikes = strikesByInstrument[instrument.shortName];
    if (!midiStrikes) {
        throw "wat";
    }

    forEach(midiStrikes, (midiStrike: MidiStrike, index: number) => {
        // const insertTime = startingOffset + midiStrike.seconds - marker.start.seconds;
        
        const insertTime = startingOffset + midiStrike.seconds - marker.start.seconds;
        videoTrack.insertClip(clip, insertTime);
        debugger;
        $.writeln(`${instrument.name}: midi strike: ${insertTime}`);
    });
});
