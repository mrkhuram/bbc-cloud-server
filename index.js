let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let cors = require("cors");

// mongo db connection
require("./config/db");

// environmental variable config
require("dotenv").config({ debug: true });

app.use(cors());
app.use(bodyParser.json());

// Uploading files config


app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/tour"));
app.use("/api", require("./routes/news"));
app.use("/api", require("./routes/videos"));
app.use("/api", require("./routes/music"));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
