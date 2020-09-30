import React from "react";
import PlaylistItems from "./PlaylistItems";

export const Playlists = (props) => {
  // console.log(props.playlist);
  // return (
  //   <div>
  //     <PlaylistItems playlist={props.playlist} />
  //   </div>
  // );

  return props.playlist.map((track) => <PlaylistItems track={track} />);
};
