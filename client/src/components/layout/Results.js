import React, { Component, Fragment } from "react";
import Spotify from "spotify-web-api-js";
import { Playlists } from "./Playlists";
import { AddPlaylist } from "./AddPlaylist";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import RadarPlaylist from "../charts/Radar";

const spotifyWebApi = new Spotify();

export class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // return <div>yessir</div>;
    return (
      <div
        className="text-white"
        style={{ backgroundColor: "#221f1f", minHeight: "100vh" }}
      >
        <Navbar
          loggedIn={this.props.loggedIn}
          setDemoAccount={this.setDemoAccount}
          username={this.props.username}
        />
        {this.props.loading &&
        (this.props.loading || this.props.playlistIsReturned) ? (
          <Fragment>
            <Spinner />
            <h2 className="text-center">
              Analyzing {this.props.numSongsAnalyzed} songs from target
              playlists
            </h2>
          </Fragment>
        ) : null}

        {this.props.playlistIsReturned ? (
          <div>
            <button className="btn btn-secondary btn-sm btn-block">
              <Link to="/" style={{ color: "white" }}>
                Back to search
              </Link>
            </button>
            <h2 className="mx-2 my-3">
              Songs That Match "{this.props.keyword}"
            </h2>
            <AddPlaylist playlistURI={this.props.finalIDArrayURI} />
            <RadarPlaylist />

            <Playlists
              playlist={this.props.finalSongArray}
              playlistURI={this.props.finalIdArray}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Results;
