const express = require("express");
const router = express.Router();

//@route    GET api/playlist
//@desc     Get all Plalists
//@access   private
router.get("/", (req, res) => {
  res.send("Get all Plalists");
});

//@route    POST api/playlist
//@desc     add new Plalists
//@access   private
router.post("/", (req, res) => {
  res.send("add new Plalist");
});

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
