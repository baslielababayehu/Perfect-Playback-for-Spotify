import React, { Component } from "react";
import Navbar from "../layout/Navbar";
import Home from "./Home";

export const Main = (props) => {
  // constructor(props) {
  //   super();
  //   this.state = {};
  // }
  console.log(props);

  return (
    <div>
      <Home captureKeyword={props.captureKeyword} />
    </div>
  );
};

export default Main;
