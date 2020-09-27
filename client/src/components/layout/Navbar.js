import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Button } from "@material-ui/core";

export const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar navbar-background">
      <h3>
        {title} <i className={icon}></i>
      </h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>sign Up</li>
        <li>Register</li>
      </ul>
      <a href="http://localhost:5000/login" className="btn btn-primary">
        Log in with Spotify
      </a>
    </div>
  );
};

Navbar.defaultProps = {
  title: "Perfect Playback",
  icon: "fa fa-linkedin",
};

export default Navbar;
