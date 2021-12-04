let midiParser  = require('midi-parser-js');
let fs = require('fs')

// read a .mid binary (as base64)
// drumbeat_ez_4_4_75bpm.mid
fs.readFile('./drumbeat_single_measure_simple_4_4_100.mid', 'base64', function (err, data) {
  // Parse the obtainer base64 string ...
  var midiArray = midiParser.parse(data);
  // done!
  console.log(JSON.stringify(midiArray));
});
