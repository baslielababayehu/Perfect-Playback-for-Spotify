import React from "react";
import PlaylistItems from "./PlaylistItems";

export const Playlists = (props) => {
  return (
    <div className="row mx-1 p-0 mt-2">
      {props.playlist.map((track) => (
        <div
          className="col-auto border border-secondary m-1"
          style={{ backgroundColor: "rgba(29,185,84,0.3)" }}
        >
          <PlaylistItems track={track} />
        </div>
      ))}
    </div>
  );
};
