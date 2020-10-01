import React, { useState } from "react";
import { FaSpotify } from "react-icons/fa";
import Navbar from "../layout/Navbar";
import { Button } from "@material-ui/core";
import axios from "axios";

import "./Home.css";

export const Home = (props) => {
  return (
    <div className="main-container p-0 m-0">
      <div className="row p-0 m-0">
        <div className="col-12 p-0 m-0">
          <Navbar
            loggedIn={props.loggedIn}
            username={props.username}
            setDemoAccount={props.setDemoAccount}
          />
        </div>
        <div className="col-12 p-0 m-0">
          <div className="home-background">
            <div className="home-container">
              <FaSpotify className="spotify-icon-home" />
              <div className="home-header">Search Your Playlist Idea</div>

              <input
                id="home-input"
                type="text"
                spellCheck="false"
                className="home-input"
                placeholder="e.g Throwback pop"
                // onChange={handleChange}
                onKeyDown={props.onEnter}
              />
              <p className="text-white" id="description">
                Perfect Playback will find the most relevant tracks by analysing
                top public playlists{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
