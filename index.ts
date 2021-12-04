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

interface instrument {
    name: string;
}

interface strike {
    seconds: number;
    velocity: number;
    instrument: instrument;
};

const instruments = {
    36: {
        name: "bass drum",
    },
    38: {
        name: "snare",
    },
    42: {
        name: "closed hi-hat",
    },
}

// deltaTime = 24 is a sixteenth note.

const bpm = 100;
// we insert by time, so we need something that'll just
// bpm2wat


const strikes: strike[] = [];

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
    const instrument = instruments[note];
    if (instrument) {
        $.writeln(`${instrument.name} playing at time ${time}`);
        strikes.push({ seconds: 123, velocity, instrument });
    }
}

// OK now we have strikes
debugger;

// OK... sooooooo
// we have midi data. but Ableton doesn't seem to export the tempo of the track.
// that's fine we can just write it here.

const trackNr = 0;
const clipNr = 0;

const seq = app.project.activeSequence;
const videoTracks = seq.videoTracks;
const videoTrack = videoTracks[trackNr];
const clips = videoTrack.clips;
const videoClip = videoTrack.clips[clipNr];

// $.writeln(`the clips`)
// $.writeln(
//     map(videoTrack.clips, c => c.name)
// )

// Get a list of all the clips that are in the project panel
const availableClips = app.project.rootItem.children;
const clip = availableClips[2];
const markers = clip.getMarkers();
const marker: Marker = markers[1];
$.writeln(marker.name);
// marker.start.seconds

videoTrack.insertClip(clip, 1);
videoTrack.insertClip(clip, 2);
videoTrack.insertClip(clip, 4);
// videoTrack.insertClip(trackNr, trackNr);
