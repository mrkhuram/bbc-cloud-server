let mongoose = require("mongoose");

let Store = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    description:{
      type: String,
      default: true,
    },
    quantity:{
      type: Number,
      default: true,
    },
    product_image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("Store", Store);
