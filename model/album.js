let mongoose = require("mongoose");

let Album = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    title_img: {
      type: String,
      required: true,
    },
    album_photos: {
      type: [{ album_image: { type: String } }],
      required: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("Album", Album);
