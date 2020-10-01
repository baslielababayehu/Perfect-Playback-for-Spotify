import React from "react";
import { Radar } from "react-chartjs-2";

const data = {
  labels: [
    "Dancability",
    "Acousticness",
    "energy",
    "instrumentalness",
    "speechiness",
  ],
  datasets: [
    {
      label: "New Playlist Stats",
      backgroundColor: "rgba(29,185,84,0.3)",
      borderColor: "#1DB954",
      pointBackgroundColor: "black",
      pointBorderColor: "black",
      pointHoverBackgroundColor: "#1DB954",
      pointHoverBorderColor: "rgba(179,181,198,1)",
      data: [65, 59, 90, 81, 56],
    },
  ],
};

export const RadarPlaylist = () => {
  return (
    <div>
      <h2>Playlist Stats</h2>
      <p>The playlist created for you has the following attributes.</p>
      <div
        className="row"
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="col-6" style={{ backgroundColor: "white" }}>
          <Radar data={data} />
        </div>
      </div>
    </div>
  );
};

export default RadarPlaylist;
