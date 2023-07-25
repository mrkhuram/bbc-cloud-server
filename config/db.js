let mongoose = require("mongoose");

let path =
  "mongodb+srv://sliderboard:sliderboard@slideboard.lanoepk.mongodb.net/bbccloud?retryWrites=true&w=majority";

mongoose
  .connect(path, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((success) => {
    if (success) console.log("Mongo DD successfully connected");
  })
  .then((err) => {
    if (err) console.log(err);
  })