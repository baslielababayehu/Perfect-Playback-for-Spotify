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
      arrayWithPlaylistId: [], //original order maintained
      arrayWithTargetPLSongs: [], //original order maintained
      arrayWithTargetPLSongsId: [], //original order maintained
      nowPlaying: {
        name: "Not Checked",
        image: "",
      },
      sortedSongName: [],
      sortedSongFreq: [],
      finalSongArray: [],
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

  async getPrimaryRecommendations() {
    await spotifyWebApi
      .searchPlaylists("throwback rap", { limit: 50 })
      .then((response) => {
        console.log(response.playlists.items.length);
        let i = 0;
        while (i < response.playlists.items.length) {
          let arr = this.state.arrayWithPlaylistId;
          arr.push(response.playlists.items[i].id);
          i++;
        }
        console.log(this.state.arrayWithPlaylistId);
      });

    for (let i = 0; i < 50; i++) {
      await spotifyWebApi
        .getPlaylistTracks(this.state.arrayWithPlaylistId[i])
        .then((response) => {
          console.log(response.items.length);
          // console.log(response.items[i].track.name);
          let j = 0;
          while (j < response.items.length) {
            if (!response.items[j].track) {
              console.log(null);
              j++;
            } else {
              let arr = this.state.arrayWithTargetPLSongs;
              let arrId = this.state.arrayWithTargetPLSongsId;
              arr.push(response.items[j].track.name);
              arrId.push(response.items[j].track.id);
              j++;
            }
          }
        });
    }
    // console.log(this.state.arrayWithTargetPLSongsId);
  }

  sortPLsongsByFreq = async () => {
    await this.getPrimaryRecommendations;
    const arr = this.state.arrayWithTargetPLSongs;
    let a = [],
      b = [],
      prev;

    arr.sort();
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== prev) {
        a.push(arr[i]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = arr[i];
    }

    let x = 0;
    const sortedSongName = this.state.sortedSongName;
    const sortedSongFreq = this.state.sortedSongFreq;
    while (x < a.length) {
      sortedSongName.push(a[x]);
      sortedSongFreq.push(b[x]);
      x++;
    }

    console.log([a, b]);
  };

  returnMostPopularSong = async () => {
    await this.sortPLsongsByFreq();
    // console.log(this.state.sortedSongFreq);
    let sortedSongFreq = this.state.sortedSongFreq;
    // for (var i = 0; i < sortedSongFreq.length; i++) {
    //   sortedSongFreq[i] = [sortedSongFreq[i], i];
    // }
    // sortedSongFreq.sort(function (left, right) {
    //   return left[0] < right[0] ? -1 : 1;
    // });
    // sortedSongFreq.sortIndices = [];
    // for (var j = 0; j < sortedSongFreq.length; j++) {
    //   sortedSongFreq.sortIndices.push(sortedSongFreq[j][1]);
    //   sortedSongFreq[j] = sortedSongFreq[j][0];
    // }
    function cmp_rnum(a, b) {
      // comparison function: reverse numeric order
      return b - a;
    }
    function index_map(acc, item, index) {
      // reduction function to produce a map of array items to their index
      acc[item] = index;
      return acc;
    }
    function ranks(v) {
      let rankindex = v
        .slice()
        .sort(cmp_rnum)
        .reduceRight(index_map, Object.create(null));
      // reduceLeft() is used so the lowest rank wins if there are duplicates
      // use reduce() if you want the highest rank
      return v.map(function (item) {
        return rankindex[item] + 1;
      });
    }
    let rankedSongs = [];
    rankedSongs = ranks(this.state.sortedSongFreq);
    console.log(rankedSongs);
    console.log(this.state.sortedSongFreq);

    const pushPopularSongsToArr = (initRank, endRank) => {
      let index = 0;
      while (index < rankedSongs.length) {
        if (initRank <= rankedSongs[index] && rankedSongs[index] < endRank) {
          this.state.finalSongArray.push(this.state.sortedSongName[index]);
        }
        index++;
      }
    };
    let index = 0;
    while (this.state.finalSongArray.length < 100) {
      pushPopularSongsToArr(index, index + 5);
      index = index + 5;
    }

    // index = 0;
    // while (index < rankedSongs.length) {
    //   if (5 < rankedSongs[index] < 15) {
    //     this.state.finalSongArray.push(this.state.sortedSongName[index]);
    //   }
    //   index++;
    // }

    // console.log(this.state.arrayWithTargetPLSongs);
    console.log(this.state.finalSongArray);
  };

  async getExtraRecommendations() {
    await spotifyWebApi
      .getRecommendations({
        seed_artists: "4NHQUGzhtTLFvgF5SZesLK", //make this the modal popular artist from plist
        seed_genres: "classical,country", //make this the modal genre from plist
        seed_tracks: "0c6xIDDpzE81m2q797ordA", //make this the modal popular track from plist
        limit: 50,
      })
      .then((response) => {
        console.log(response);
      });
  }

  async getPlaylistRecommendations() {
    await spotifyWebApi.searchPlaylists().then((response) => {
      console.log(response);
    });
  }
  componentDidMount() {
    this.getNowPlaying();
    this.getExtraRecommendations();
    this.getPlaylistRecommendations();
    this.getPrimaryRecommendations();
    // this.returnMostPopularSong();
    // this.sortPLsongsByFreq();
  }

  render() {
    return (
      <div>
        <button onClick={this.returnMostPopularSong}>click me</button>
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
