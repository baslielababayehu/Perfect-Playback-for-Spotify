import React, { Fragment, setState, useEffect, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Results from "./components/layout/Results";
import Main from "./components/pages/Main";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();

    this.state = {
      //Login and Search
      keyword: "",
      access_token: "none",
      username: "",
      loggedIn: params.access_token ? true : false,
      redirect: 0,

      arrayWithPlaylistId: [], //original order maintained
      arrayWithTargetPLSongs: [], //original order maintained
      arrayWithTargetPLSongsId: [], //original order maintained

      noOfSongsAnalyzed: 0,

      sortedSongName: [],
      sortedSongFreq: [],
      sortedIdName: [],
      sortedIdFreq: [],

      finalSongArray: [],
      finalIdArray: [],

      finalIDArrayURI: [],

      loading: false,
      playlistIsReturned: false,
      disabled: false,
      demo: false,
      //
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
      this.state.access_token = params.access_token;
      this.getuserinfo();
    }
  }
  componentDidMount() {
    // this.getuserinfo();
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

  //get a an array
  async getPrimaryRecommendations() {
    this.setState({ loading: true });
    await spotifyWebApi
      .searchPlaylists(this.state.keyword, { limit: 50 })
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
      this.setState({
        noOfSongsAnalyzed: this.state.arrayWithTargetPLSongs.length,
      });
      console.log(this.state.noOfSongsAnalyzed);
    }
    this.setState({ loading: false });
    this.returnMostPopularSong();
  }

  sortPLsongsByFreq = async () => {
    await this.getPrimaryRecommendations;

    const findFrequencyOfItems = (arr, sortArr, freqArr) => {
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

      while (x < a.length) {
        sortArr.push(a[x]);
        freqArr.push(b[x]);
        x++;
      }

      console.log([a, b]);
    };
    findFrequencyOfItems(
      this.state.arrayWithTargetPLSongs,
      this.state.sortedSongName,
      this.state.sortedSongFreq
    );
    findFrequencyOfItems(
      this.state.arrayWithTargetPLSongsId,
      this.state.sortedIdName,
      this.state.sortedIdFreq
    );
    console.log(this.state.sortedIdName);
  };

  returnMostPopularSong = async () => {
    this.setState({ loading: true });

    await this.sortPLsongsByFreq();
    let sortedSongFreq = this.state.sortedSongFreq;

    function cmp_rnum(a, b) {
      return b - a;
    }
    function index_map(acc, item, index) {
      acc[item] = index;
      return acc;
    }

    function ranks(v) {
      let rankindex = v
        .slice()
        .sort(cmp_rnum)
        .reduceRight(index_map, Object.create(null));
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
          this.state.finalIdArray.push(this.state.sortedIdName[index]);
        }
        index++;
      }
    };
    let index = 0;
    while (this.state.finalSongArray.length < 100) {
      pushPopularSongsToArr(index, index + 5);
      index = index + 5;
    }
    this.state.finalSongArray.splice(100, this.state.finalSongArray.length - 1);
    this.state.finalIdArray.splice(100, this.state.finalIdArray.length - 1);

    this.state.finalIDArrayURI = this.state.finalIdArray.map(
      (i) => "spotify:track:" + i
    );

    console.log(this.state.finalSongArray);
    console.log(this.state.finalIdArray);

    this.setState({ loading: false });
    this.setState({ playlistIsReturned: true });
  };

  onEnter = async (e) => {
    // event.presist();
    if (e.key === "Enter") {
      await this.resetState();
      if (this.state.access_token !== "none") {
        const newKeyword = document.getElementById("home-input").value;
        await this.setState({ keyword: newKeyword });
        // this.state.keyword = e.target.value;

        // console.log("searching for" + e.target.value);
        // console.log(this.state.keyword);
        // this.renderSearch();
        await this.setState({
          redirect: 1,
        });

        if (this.state.redirect === 1) {
          this.getPrimaryRecommendations();
        }
        await this.setState({
          redirect: 0,
        });
      } else {
        // console.log("please Log in First");
        // console.log(this.state.access_token);
      }

      // console.log(this.state.redirect);
    }
  };
  getuserinfo = () => {
    spotifyWebApi.getMe().then((response) => {
      this.setState({ username: response.display_name });
      // this.state.username = response.display_name;
      console.log(this.state.username);
    });
  };

  resetState = () => {
    this.setState({
      keyword: "",
      redirect: 0,

      arrayWithPlaylistId: [],
      arrayWithTargetPLSongs: [],
      arrayWithTargetPLSongsId: [],

      noOfSongsAnalyzed: 0,

      sortedSongName: [],
      sortedSongFreq: [],
      sortedIdName: [],
      sortedIdFreq: [],

      finalSongArray: [],
      finalIdArray: [],

      finalIDArrayURI: [],

      loading: false,
      playlistIsReturned: false,
      disabled: false,
    });
  };

  setDemoAccount;

  render() {
    return (
      <Router>
        <Fragment>
          <div>
            {this.state.redirect === 1 ? (
              <Redirect to={{ pathname: "/Results" }} />
            ) : (
              console.log("dont edirect to playlist")
            )}
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Home
                      onEnter={this.onEnter}
                      access_token={this.state.access_token}
                      loggedIn={this.state.loggedIn}
                      username={this.state.username}
                    />
                  </Fragment>
                )}
              />
              <Route
                exact
                path="/Home"
                render={(props) => (
                  <Fragment>
                    <Home
                      onEnter={this.onEnter}
                      access_token={this.state.access_token}
                      loggedIn={this.state.loggedIn}
                      username={this.state.username}
                      setDemoAccount={this.setDemoAccount}
                    />
                  </Fragment>
                )}
              />
              <Route
                exact
                path="/About"
                render={(props) => (
                  <Fragment>
                    <About loggedIn={this.state.loggedIn} />
                  </Fragment>
                )}
              />
              <Route
                exact
                path="/Results"
                render={() =>
                  this.state.loggedIn ? (
                    <Results
                      loading={this.state.loading}
                      keyword={this.state.keyword}
                      playlistIsReturned={this.state.playlistIsReturned}
                      finalIDArrayURI={this.state.finalIDArrayURI}
                      finalSongArray={this.state.finalSongArray}
                      loggedIn={this.state.loggedIn}
                      numSongsAnalyzed={this.state.noOfSongsAnalyzed}
                      setDemoAccount={this.setDemoAccount}
                    />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
