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

    const { name, email, phone, type } = req.body;

    try {
      const newPlaylist = new Playlist({
        name,
        date,
        user: req.user.id,
      });
      const playlist = await newPlaylist.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    PUT api/playlist/:id
//@desc     update playlist
//@access   private
router.put("/", (req, res) => {
  res.send("update playlist");
});

//@route    DELETE api/playlist/:id
//@desc     delete playlist
//@access   private
router.delete("/", (req, res) => {
  res.send("delete playlist");
});

module.exports = router;
