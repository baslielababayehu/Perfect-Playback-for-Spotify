import React, { useState } from "react";
import { FaSpotify } from "react-icons/fa";
import Navbar from "../layout/Navbar";
import { Button } from "@material-ui/core";
import axios from "axios";

import "./Home.css";

export const Home = () => {
  const [keyword, setKeyword] = useState({
    PlaylistKeyword: "",
  });

  const { PlaylistKeyword } = keyword;

  const handleChange = (name) => (e) => {
    setKeyword({ ...keyword, [name]: e.target.value, buttonDisable: false });
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      console.log(e.target.value);
    }
  };
  return (
    <div className="home-background">
      <div className="home-container">
        <FaSpotify className="spotify-icon-home" />
        <div className="home-header">Search Your Playlist Idea</div>
        <input
          type="text"
          spellCheck="false"
          className="home-input"
          placeholder="e.g Throwback pop"
          onChange={handleChange("PlaylistKeyword")}
          onKeyDown={onEnter}
          value={PlaylistKeyword}
        />
      </div>
    </div>
  );
};

export default Home;
