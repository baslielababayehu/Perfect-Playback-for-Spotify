import React, { Component, Fragment } from "react";
import Spotify from "spotify-web-api-js";
import { Playlists } from "./Playlists";
import { AddPlaylist } from "./AddPlaylist";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const spotifyWebApi = new Spotify();

export class Results extends Component {
  constructor(props) {
    super(props);
  }
  // const params = this.getHashParams();
  //   this.state = {
  //     loggedIn: params.access_token ? true : false,
  //     arrayWithPlaylistId: [], //original order maintained
  //     arrayWithTargetPLSongs: [], //original order maintained
  //     arrayWithTargetPLSongsId: [], //original order maintained
  //     nowPlaying: {
  //       name: "Not Checked",
  //       image: "",
  //     },
  //     sortedSongName: [],
  //     sortedSongFreq: [],
  //     sortedIdName: [],
  //     sortedIdFreq: [],

  //     finalSongArray: [],
  //     finalIdArray: [],

  //     finalIDArrayURI: [],

  //     loading: false,
  //     playlistIsReturned: false,
  //     disabled: false,
  //   };
  //   if (params.access_token) {
  //     spotifyWebApi.setAccessToken(params.access_token);
  //   }
  // }

  // getHashParams() {
  //   var hashParams = {};
  //   var e,
  //     r = /([^&;=]+)=?([^&;]*)/g,
  //     q = window.location.hash.substring(1);
  //   while ((e = r.exec(q))) {
  //     hashParams[e[1]] = decodeURIComponent(e[2]);
  //   }
  //   console.log(hashParams);
  //   return hashParams;
  // }

  // async getPrimaryRecommendations() {
  //   this.setState({ loading: true });
  //   await spotifyWebApi
  //     .searchPlaylists(this.props.keyword, { limit: 50 })
  //     .then((response) => {
  //       console.log(response.playlists.items.length);
  //       let i = 0;
  //       while (i < response.playlists.items.length) {
  //         let arr = this.state.arrayWithPlaylistId;
  //         arr.push(response.playlists.items[i].id);
  //         i++;
  //       }
  //       console.log(this.state.arrayWithPlaylistId);
  //     });

  //   for (let i = 0; i < 50; i++) {
  //     await spotifyWebApi
  //       .getPlaylistTracks(this.state.arrayWithPlaylistId[i])
  //       .then((response) => {
  //         console.log(response.items.length);
  //         // console.log(response.items[i].track.name);
  //         let j = 0;
  //         while (j < response.items.length) {
  //           if (!response.items[j].track) {
  //             console.log(null);
  //             j++;
  //           } else {
  //             let arr = this.state.arrayWithTargetPLSongs;
  //             let arrId = this.state.arrayWithTargetPLSongsId;
  //             arr.push(response.items[j].track.name);
  //             arrId.push(response.items[j].track.id);
  //             j++;
  //           }
  //         }
  //       });
  //   }
  //   this.setState({ loading: false });
  //   this.returnMostPopularSong();
  // }

  // sortPLsongsByFreq = async () => {
  //   await this.getPrimaryRecommendations;

  //   const findFrequencyOfItems = (arr, sortArr, freqArr) => {
  //     let a = [],
  //       b = [],
  //       prev;

  //     arr.sort();
  //     console.log(arr);
  //     for (let i = 0; i < arr.length; i++) {
  //       if (arr[i] !== prev) {
  //         a.push(arr[i]);
  //         b.push(1);
  //       } else {
  //         b[b.length - 1]++;
  //       }
  //       prev = arr[i];
  //     }

  //     let x = 0;

  //     while (x < a.length) {
  //       sortArr.push(a[x]);
  //       freqArr.push(b[x]);
  //       x++;
  //     }

  //     console.log([a, b]);
  //   };
  //   findFrequencyOfItems(
  //     this.state.arrayWithTargetPLSongs,
  //     this.state.sortedSongName,
  //     this.state.sortedSongFreq
  //   );
  //   findFrequencyOfItems(
  //     this.state.arrayWithTargetPLSongsId,
  //     this.state.sortedIdName,
  //     this.state.sortedIdFreq
  //   );
  //   console.log(this.state.sortedIdName);
  // };

  // returnMostPopularSong = async () => {
  //   this.setState({ loading: true });

  //   await this.sortPLsongsByFreq();
  //   let sortedSongFreq = this.state.sortedSongFreq;

  //   function cmp_rnum(a, b) {
  //     return b - a;
  //   }
  //   function index_map(acc, item, index) {
  //     acc[item] = index;
  //     return acc;
  //   }

  //   function ranks(v) {
  //     let rankindex = v
  //       .slice()
  //       .sort(cmp_rnum)
  //       .reduceRight(index_map, Object.create(null));
  //     return v.map(function (item) {
  //       return rankindex[item] + 1;
  //     });
  //   }

  //   let rankedSongs = [];
  //   rankedSongs = ranks(this.state.sortedSongFreq);
  //   console.log(rankedSongs);
  //   console.log(this.state.sortedSongFreq);

  //   const pushPopularSongsToArr = (initRank, endRank) => {
  //     let index = 0;
  //     while (index < rankedSongs.length) {
  //       if (initRank <= rankedSongs[index] && rankedSongs[index] < endRank) {
  //         this.state.finalSongArray.push(this.state.sortedSongName[index]);
  //         this.state.finalIdArray.push(this.state.sortedIdName[index]);
  //       }
  //       index++;
  //     }
  //   };
  //   let index = 0;
  //   while (this.state.finalSongArray.length < 100) {
  //     pushPopularSongsToArr(index, index + 5);
  //     index = index + 5;
  //   }
  //   this.state.finalSongArray.splice(100, this.state.finalSongArray.length - 1);
  //   this.state.finalIdArray.splice(100, this.state.finalIdArray.length - 1);

  //   this.state.finalIDArrayURI = this.state.finalIdArray.map(
  //     (i) => "spotify:track:" + i
  //   );

  //   console.log(this.state.finalSongArray);
  //   console.log(this.state.finalIdArray);

  //   this.setState({ loading: false });
  //   this.setState({ playlistIsReturned: true });
  // };

  // componentDidMount() {
  // this.getNowPlaying();
  // this.props.captureAccessToken();
  // this.getPrimaryRecommendations();
  // }

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
        />
        {this.props.loading &&
        (this.props.loading || this.props.playlistIsReturned) ? (
          <Fragment>
            <Spinner />
            <h2>Analyzing {this.props.numSongsAnalyzed} songs</h2>
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
