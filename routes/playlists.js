const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
const Playlist = require("../models/Playlist");

//@route    GET api/playlist
//@desc     Get all Plalists
//@access   private
router.get("/", auth, async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(playlists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/playlist
//@desc     add new Plalists
//@access   private
router.post(
  "/",
  [auth, check("name", "Name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      const newPlaylist = new Playlist({
        name,
        date,
        user: req.user.id,
      });
      const playlist = await newPlaylist.save();

      res.json(playlist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    PUT api/playlist/:id
//@desc     update playlist
//@access   private
router.put("/", auth, async (req, res) => {
  const { name } = req.body;

  //build a playlist obect
  const playlistFields = {};
  if (name) playlistFields.name = name;

  try {
    let playlist = await Playlist.findById(req.params.id);

    if (!playlist) return res.status(404).json({ msg: "playlist not found" });

    //make sure user owns playlist
    if (playlist.user.toString !== req.user.id) {
      return res.status(401).json({ msg: "Not authoeized" });
    }

    playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { $set: playlistFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/playlist/:id
//@desc     delete playlist
//@access   private
router.delete("/", auth, async (req, res) => {
  try {
    let playlist = await Playlist.findById(req.params.id);

    if (!playlist) return res.status(404).json({ msg: "playlist not found" });

    //make sure user owns playlist
    if (playlist.user.toString !== req.user.id) {
      return res.status(401).json({ msg: "Not authoeized" });
    }

    await Playlist.findByIdAndRemove(reqs.params.id);

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
