import React from "react";
import PlaylistItems from "./PlaylistItems";

export const Playlists = (props) => {
  // console.log(props.playlist);
  // return (
  //   <div>
  //     <PlaylistItems playlist={props.playlist} />
  //   </div>
  // );

  return (
    <div className="row mx-1 p-0">
      {props.playlist.map((track) => (
        <div className="col-auto border border-secondary m-1">
          <PlaylistItems track={track} />
        </div>
      ))}
    </div>
  );
};
