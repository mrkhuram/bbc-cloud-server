let mongoose = require("mongoose");

let AlbumPhoto = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    title_img: {
      type: String,
      required: true,
    },
    album: {
      type: mongoose.Types.ObjectId,
      ref: "Album",
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("AlbumPhoto", AlbumPhoto);
