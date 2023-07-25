let mongoose = require("mongoose");

let News = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    music_image: {
      type: String,
      required: true,
    },
    music_link: {
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

module.exports = mongoose.model("News", News);
