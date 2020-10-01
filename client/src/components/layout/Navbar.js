import React from "react";
import { Link } from "react-router-dom";
import { FaSpotify } from "react-icons/fa";
import "./Navbar.css";
import { Button } from "@material-ui/core";

export const Navbar = (props) => {
  // console.log(props);
  return (
    <div className="text-white pr-3" style={{ backgroundColor: "#221f1f" }}>
      <div className="row p-0 m-0 pt-2">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
          <h3 className="title">
            <FaSpotify className="spotify-icon mr-2" />
            {props.title}
          </h3>
        </div>

        <div
          className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 nav-links p-0 m-0"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ul>
            <li style={{ display: "inline" }} className="nav-item ml-3">
              <Link to="/" style={{ color: "white" }}>
                Home
              </Link>
            </li>
            <li style={{ display: "inline" }} className="ml-4 nav-item">
              <Link to="/about" style={{ color: "white" }}>
                About
              </Link>
            </li>
            {props.loggedIn ? (
              <li className="text-warning ml-4" style={{ display: "inline" }}>
                Logged in as {props.username}
              </li>
            ) : (
              <li
                style={{ display: "inline" }}
                className="ml-4 text-warning nav-item login"
              >
                Not Logged in
              </li>
            )}
          </ul>
        </div>
        {props.loggedIn ? null : (
          <div className="col-12 my-3">
            <div className="row">
              <div className="col-6">
                <a
                  href="http://localhost:5000/login"
                  className="btn btn-block btn-secondary btn-sm"
                  style={{ backgroundColor: "#1DB954" }}
                >
                  Log in with Spotify
                </a>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-secondary btn-sm btn-block "
                  onClick={props.setDemoAccount}
                >
                  Use Basliel's account as a demo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Navbar.defaultProps = {
  title: "Perfect Playback",
  // icon: "fa fa-linkedin",
};

export default Navbar;
