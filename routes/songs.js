const express = require("express");
const songsRouter = express.Router();

const { createSongs, getSongsData, deleteSongs, updateSongs } = require("../controllers/songs");

songsRouter.get("/:id", getSongsData);
songsRouter.post("/post", createSongs);
songsRouter.put("/update", updateSongs);
songsRouter.delete("/:id", deleteSongs);



module.exports = songsRouter;
