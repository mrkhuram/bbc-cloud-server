let mongoose = require("mongoose");

let News = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    video_image: {
      type: String,
      required: true,
    },
    video_link: {
      type: String,
      required: true,
    },
    isOfficial:{
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("News", News);
