let midiParser  = require('midi-parser-js');
let fs = require('fs')

// usage:
// node midi-to-json.js file.mid

let filename = process.argv[2];
let outFilename = `${filename}.json`;
console.log(`converting ${filename} to json, writing to ${outFilename}`)
fs.readFile(filename, 'base64', function (err, data) {
  var midiArray = midiParser.parse(data);
  const json = JSON.stringify(midiArray, null, 2);
  fs.writeFileSync(outFilename, json);
});
