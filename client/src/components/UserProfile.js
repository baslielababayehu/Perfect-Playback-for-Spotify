import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
// import { response } from "express";
const spotifyWebApi = new Spotify();

export class UserProfile extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: "Not Checked",
        image: "",
      },
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    console.log(hashParams);
    return hashParams;
  }
  async getNowPlaying() {
    await spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
      console.log(response.item);
      // this.state.nowPlaying.name = response.item.name;
      this.setState({
        nowPlaying: {
          name: response.item.name,
          image: response.item.album.images[0].url,
        },
      });
    });
    // console.log(currentSong);
  }
  async getUserPlaylists() {
    await spotifyWebApi.getUserPlaylists().then((response) => {
      console.log(response);
    });
  }
  async getPlaylistRecommendations() {
    await spotifyWebApi.searchPlaylists().then((response) => {
      console.log(response);
    });
  }
  componentDidMount() {
    // console.log("object");
    this.getNowPlaying();
    this.getUserPlaylists();
    this.getPlaylistRecommendations("the weeknd");
  }

  render() {
    return (
      <div>
        <button onClick={this.getNowPlaying}>click me</button>
        <div>Now Playing:{this.state.nowPlaying.name}</div>
        <div>
          <img
            src={this.state.nowPlaying.image}
            alt=""
            style={{ width: "200px", margin: "10px" }}
          />
        </div>
      </div>
    );
  }
}

export default UserProfile;
