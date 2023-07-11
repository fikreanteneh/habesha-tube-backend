const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config();

//! custom Route imports
const authRouter = require("./routes/auth");
const songsRouter = require("./routes/songs");


//! Global Middle-wares
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! Routes
app.use("/auth", authRouter);
app.use("/songs", songsRouter);


//! Start Express server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {})
