import React, { Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import { Auth } from "./Auth";
import UserProfile from "./components/UserProfile";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path="/Home" component={Home} />
            <Route exact path="/About" component={About} />
            <Route exact path="/UserProfile" component={UserProfile} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
