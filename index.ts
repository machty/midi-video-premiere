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
  let parts = path.split(".");
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
    const value = get(element, key);
    ret[value] = element;
  }
  return ret;
}

function groupBy(array: any[], key: string) {
  const ret = {};
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const value = get(element, key);
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
        { deltaTime: 0, type: 255, metaType: 3, data: "\u0000" },
        { deltaTime: 0, type: 255, metaType: 88, data: [1, 2, 36, 8] },
        { deltaTime: 0, type: 255, metaType: 88, data: [1, 2, 36, 8] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 127] },
        { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 72, type: 9, channel: 0, data: [36, 127] },
        { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 72, type: 9, channel: 0, data: [36, 127] },
        { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 24, type: 9, channel: 0, data: [36, 127] },
        { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 24, type: 9, channel: 0, data: [36, 127] },
        { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 24, type: 9, channel: 0, data: [36, 127] },
        { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 24, type: 9, channel: 0, data: [36, 127] },
        { deltaTime: 16, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 16, type: 9, channel: 0, data: [36, 127] },
        { deltaTime: 16, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 16, type: 9, channel: 0, data: [36, 127] },
        { deltaTime: 16, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 16, type: 9, channel: 0, data: [36, 127] },
        { deltaTime: 16, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 16, type: 9, channel: 0, data: [36, 127] },
        { deltaTime: 16, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 16, type: 9, channel: 0, data: [36, 127] },
        { deltaTime: 16, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 16, type: 9, channel: 0, data: [36, 124] },
        { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 124] },
        { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 124] },
        { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 124] },
        { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 124] },
        { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 124] },
        { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 124] },
        { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 124] },
        { deltaTime: 24, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
        { deltaTime: 0, type: 9, channel: 0, data: [36, 120] },
        { deltaTime: 12, type: 8, channel: 0, data: [36, 64] },
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
}

interface MidiStrike {
  seconds: number;
  velocity: number;
  instrument: Instrument;
}

function createInstrument(name, shortName) {
  return {
    name,
    shortName,
    videoStrikes: [],
  };
}

const bassDrum = createInstrument("bass drum", "bd");
const snareDrum = createInstrument("snare", "sn");
const hiHatClosed = createInstrument("closed hi-hat", "hhc");
const instruments: Instrument[] = [bassDrum, snareDrum, hiHatClosed];
const instrumentsByShortName = indexBy(instruments, "shortName");

const instrumentsByMidiNote = {
  36: bassDrum,
  38: snareDrum,
  42: hiHatClosed,
};

const BPM = 100;
const BEATS_PER_SECOND = BPM / 60;
const PULSES_PER_QUARTER_NOTE = midi.timeDivision;
const BEATS_PER_MEASURE = 4; // TODO: make this take into account time signature events?

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
  // $.writeln(`${instrument.name} playing at time ${time}`);
  const seconds = time / PULSES_PER_QUARTER_NOTE / BEATS_PER_SECOND;
  strikes.push({ seconds, velocity, instrument });
}

const seq = app.project.activeSequence;
const videoTracks = seq.videoTracks;

const availableClips = app.project.rootItem.children;
for (let ci = 0; ci < availableClips.numItems; ci++) {
  const clip = availableClips[ci];
  const [shortName, velocity, description] = clip.name.split(",");
  const instrument = instrumentsByShortName[shortName];
  if (!instrument) {
    continue;
  }

  const marker = clip.getMarkers()[0] as Marker;

  instrument.videoStrikes.push({
    clip,
    marker,
  });
}

const strikesByInstrument = groupBy(strikes, "instrument.shortName");

// Now that we have a database of video strikes to choose from, we need to
// assemble the video sequences according to the midi.
// There are lots of potential algorithms we could consider for doing this in the future.
// But for now, we're doing:
// - one video track per instrument
// - no transitions / effects
// - simply set the start/in/end points
// - in case of overlap, find the midpoint between first and second clip strikes and cut the end of the first clip there and start the second there.

const STARTING_OFFSET = 1; // seconds
const CLIP_FRAMES_BEFORE_STRIKE = 10; // hacky, but sidesteps the issue of markers having negative times
const FPS = 24;
const CLIP_SECONDS_BEFORE_STRIKE = CLIP_FRAMES_BEFORE_STRIKE / FPS;

class VirtualClipInstance {
  strikeAtSeconds: number;
  beforeSeconds: number;
  afterSeconds: number;
  midiStrike: MidiStrike;
  videoStrike: VideoStrike;

  constructor(midiStrike: MidiStrike, videoStrike: VideoStrike) {
    this.midiStrike = midiStrike;
    this.videoStrike = videoStrike;
    this.strikeAtSeconds = midiStrike.seconds;
    this.beforeSeconds = CLIP_SECONDS_BEFORE_STRIKE;
    this.afterSeconds = 5;
  }
}

interface VirtualTrack {
  virtualClips: VirtualClipInstance[];
}

// Create a VirtualTrack for each instrument.
// Implement simple intersection-resolution algo.
// Note: even though we're scoping to a single instrument's video tracks, we should
// generalize this so that the clips stitched-together could come from a variety of instruments.
const virtualTracks: VirtualTrack[] = map(
  [bassDrum],
  (instrument: Instrument) => {
    const midiStrikes = strikesByInstrument[instrument.shortName];

    const virtualClips: VirtualClipInstance[] = map(
      midiStrikes,
      (midiStrike: MidiStrike) => {
        const newClip: VirtualClipInstance = new VirtualClipInstance(
          midiStrike,
          instrument.videoStrikes[0]
        );
        return newClip;
      }
    );

    for (let index = 0; index < virtualClips.length; index++) {
      const clip0: VirtualClipInstance = virtualClips[index];
      const clip1: VirtualClipInstance = virtualClips[index + 1];

      if (clip1) {
        // limit the end time of clip0;
        // we don't know the real end time.
        const timeBetweenStrikes =
          clip1.strikeAtSeconds - clip0.strikeAtSeconds;
        const clip1videoStart = clip1.strikeAtSeconds - clip1.beforeSeconds;
        const midpointBetweenStrikes =
          clip0.strikeAtSeconds + timeBetweenStrikes / 2;
        if (clip1videoStart < midpointBetweenStrikes) {
          // If clip1's video starts before midpoint, then
          // make clip0 end at midpoint and and make clip1 start at midpoint
          clip0.afterSeconds = midpointBetweenStrikes - clip0.strikeAtSeconds;
          clip1.beforeSeconds = clip1.strikeAtSeconds - midpointBetweenStrikes;
        } else {
          // Otherwise, no need to change clip1's start time, but clip0 should end at clip0.start
          clip0.afterSeconds = clip1videoStart - clip0.strikeAtSeconds;
        }
      }
    }

    const virtualTrack: VirtualTrack = {
      virtualClips: virtualClips,
    };

    return virtualTrack;
  }
);

forEach(virtualTracks, (virtualTrack: VirtualTrack, trackIndex: number) => {
  const videoTrack = videoTracks[trackIndex];

  forEach(
    virtualTrack.virtualClips,
    (virtualClip: VirtualClipInstance, clipIndex: number) => {
      const instrument = virtualClip.midiStrike.instrument;
      const clip = virtualClip.videoStrike.clip;

      // We're intentionally minimizing our interactions with the clip once
      // we've inserted into the sequence. The plan is:
      // - Insert the clip right when it's supposed to begin
      // - Adjust the clip's in-time in case we had to adjust the beforeTime
      const clipStart =
        virtualClip.strikeAtSeconds -
        virtualClip.beforeSeconds +
        STARTING_OFFSET;
      const clipEnd =
        virtualClip.strikeAtSeconds +
        virtualClip.afterSeconds +
        STARTING_OFFSET;

      videoTrack.overwriteClip(clip, clipStart);
      // grab the clip instance we just added to the sequence
      const clipInstance = videoTrack.clips[clipIndex] as TrackItem;
      const delta = CLIP_SECONDS_BEFORE_STRIKE - virtualClip.beforeSeconds;

      if (delta !== 0) {
        // delta is only ever positive.
        // when it is, we need to add it to the inPoint so that the clip starts _later_
        clipInstance.inPoint = clipInstance.inPoint.seconds + delta;
      }
      const duration = clipEnd - clipStart;
      $.writeln(
        `${instrument.name}: midi strike: ${clipStart} - ${clipEnd}, duration: ${duration}`
      );
    }
  );
});
