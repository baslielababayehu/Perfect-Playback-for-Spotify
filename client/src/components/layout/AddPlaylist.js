import React, { useState } from "react";
import Spotify from "spotify-web-api-js";
import { Modal } from "@material-ui/core";
import PlaylistModal from "../utils/Modal";

const spotifyWebApi = new Spotify();

export const AddPlaylist = (props) => {
  const [PlaylistName, setPlaylistName] = useState("");
  const [UserID, setuserID] = useState("");
  // const [PlaylistName, setPlaylistName] = useState("");

  // const addToSpotifyPlaylist = async () => {
  //   return <PlaylistModal />;
  // };
  const body = "Choose the name of your New playlist";
  const ButtonTitle = "Add All Songs to a New Playlist";
  const dialogTitle = "Add Playlist";
  const modalAction = "Playlist Name";

  const getUserInfo = async () => {
    await spotifyWebApi.getMe().then((response) => {
      console.log(response.uri);
      setuserID("zrxealj2bwyvk2ikj3tdt108q");
    });
  };

  const capturePlaylistName = async (e) => {
    await getUserInfo();
    // console.log("yessir");
    const playlistName = document.getElementById("form-dialog-input").value;
    console.log(UserID);
    console.log(props.playlistURI);
    await spotifyWebApi
      .createPlaylist("zrxealj2bwyvk2ikj3tdt108q", { name: playlistName })
      .then((response) => {
        const playlist_id = response.id;
        // console.log(pr);
        spotifyWebApi
          .addTracksToPlaylist(playlist_id, props.playlistURI)
          .then((response) => {
            console.log("done");
          });
      });
  };

  // const capturePlaylistName = async (e) => {
  //   await getUserInfo();
  //   // console.log("yessir");
  //   const playlistName = document.getElementById("form-dialog-input").value;
  //   console.log(UserID);
  //   await spotifyWebApi
  //     .createPlaylist("zrxealj2bwyvk2ikj3tdt108q", { name: { playlistName } })
  //     .then((response) => {
  //       const playlist_id = response.id;
  //       console.log(response);
  //       // await spotifyWebApi
  //       //   .addTracksToPlaylist(playlist_id, props.playlistURI)
  //       //   .then((response) => {
  //       //     console.log("done");
  //       //   });
  //     });
  // };

  return (
    <div className="">
      <PlaylistModal
        body={body}
        ButtonTitle={ButtonTitle}
        dialogTitle={dialogTitle}
        modalAction={modalAction}
        capturePlaylistName={capturePlaylistName}
      />
    </div>
  );
};

export default AddPlaylist;
