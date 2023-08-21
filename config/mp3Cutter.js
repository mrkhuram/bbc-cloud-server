const MP3Cutter = require("mp3-cutter");
const fs = require("fs");

const SplitAudio = (file_name) => {
  let ext = file_name.split(".")[file_name.split(".").length - 1];
  let name = Date.now() + "." + ext;

  MP3Cutter.cut({
    src: "./public/uploads/" + file_name,
    target: `./public/uploads/${name}`,
    start: 0,
    end: 30,
  });

  return name;
};

module.exports = SplitAudio;
