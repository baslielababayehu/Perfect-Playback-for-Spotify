import React from "react";
import Navbar from "../layout/Navbar";

export const About = (props) => {
  return (
    <div>
      <Navbar loggedIn={props.loggedIn} />
      <div className="p-3">
        <h1>About this App</h1>
        <p>This is a full stack react app for saving playlists!</p>
        <p>
          For more information, check out the Github repo{" "}
          <a href="https://github.com/baslielababayehu/Perfect-Playback-for-Spotify">
            here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default About;
