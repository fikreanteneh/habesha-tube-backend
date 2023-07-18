const express = require("express");
const songsRouter = express.Router();

const { createSongs, getSongsData, deleteSongs, updateSongs, getSongsDataById } = require("../controllers/songs");

songsRouter.get("/", getSongsData);
songsRouter.get("/:id", getSongsDataById);

songsRouter.post("/addsong", createSongs);
songsRouter.put("/:id", updateSongs);
songsRouter.delete("/:id", deleteSongs);



module.exports = songsRouter;
