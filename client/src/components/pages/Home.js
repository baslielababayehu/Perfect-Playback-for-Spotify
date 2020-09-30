import React, { useState } from "react";
import { FaSpotify } from "react-icons/fa";
import Navbar from "../layout/Navbar";
import { Button } from "@material-ui/core";
import axios from "axios";

import "./Home.css";

export const Home = (props) => {
  // const [keyword, setKeyword] = useState("");
  // const [access_token, setAccess_token] = useState(props.access_token);
  // const [loggedIn, setLoggedIn] = useState(false);

  // const handleChange = (name) => (e) => {
  //   setKeyword({ ...keyword, [name]: e.target.value });
  // };
  // const onEnter = (e) => {
  //   if (e.key === "Enter") {
  //     console.log(e.target.value);
  //     if (access_token) {
  //       props.captureKeyword();
  //     } else {
  //       console.log("please Log in First");
  //     }
  //     // props.redirect();

  // console.log("props");
  // };
  // };
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
