import React from "react";
import Navbar from "../layout/Navbar";

export const About = (props) => {
  return (
    <div>
      <Navbar loggedIn={props.loggedIn} />
      <h1>About this App</h1>
      <p>This is a full stack react app for saving playlists</p>
    </div>
  );
};

export default About;
