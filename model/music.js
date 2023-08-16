let mongoose = require("mongoose");

let Music = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    music_image: {
      type: String,
      required: true,
    },
    music_short_file: {
      type: String,
      required: true,
    },
    music_full_file: {
      type: String,
      required: true,
    },
    releaseDate:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("Music", Music);
