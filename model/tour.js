let mongoose = require("mongoose");

let Tour = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    ticket_link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("Tour", Tour);
