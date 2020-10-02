var globals = {};
globals.redirect_uri = "";

const express = require("express");
// const connectDB = require("./config/db");
const request = require("request");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

const config = require("config");
const dotenv = require("dotenv");

const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
//connect to the Database
// connectDB();

//init Middleware
// app.use(express.json({ extended: false }));

// app.get("/", (req, res) => res.json({ msg: "Hello World" }));

// app.use("/api/users", require("./routes/users"));
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/playlists", require("./routes/playlists"));
console.log(process.env.REACT_APP_CLIENT_ID);
const client_id = process.env.REACT_APP_CLIENT_ID; //  client id
const client_secret = process.env.REACT_APP_CLIENT_SECRET; // client secret

// const getRedirectURI = () => {
// let redirect_uri = "";

if (process.env.NODE_ENV === "production") {
  globals.redirect_uri = "/callback"; // redirect uri for production
} else {
  globals.redirect_uri = "http://localhost:5000/callback"; //  redirect uri for dev
}
// };
// getRedirectURI()

// The following code below is adapted from the Spotify API documentation

//----------------------------------------------------------------------------------

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function (length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

app.use(express.static("/client/public")).use(cors()).use(cookieParser());

app.get("/login", cors(), function (req, res) {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  let scope =
    "user-read-private user-read-email user-read-playback-state playlist-read-private playlist-modify-private playlist-read-private playlist-modify-public ";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: globals.redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", function async(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    if (process.env.NODE_ENV === "production") {
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "state_mismatch",
          })
      );
    } else {
      res.redirect(
        "http://localhost:3006/#" +
          querystring.stringify({
            error: "state_mismatch",
          })
      );
    }
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: globals.redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token,
          refresh_token = body.refresh_token;

        let options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        if (process.env.NODE_ENV === "production") {
          res.redirect(
            "/home/#" +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token,
              })
          );
        } else {
          res.redirect(
            "http://localhost:3006/home/#" +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token,
              })
          );
        }
      } else {
        if (process.env.NODE_ENV === "production") {
          res.redirect(
            "/#" +
              querystring.stringify({
                error: "invalid_token",
              })
          );
        } else {
          res.redirect(
            "http://localhost:3006/#" +
              querystring.stringify({
                error: "invalid_token",
              })
          );
        }
      }
    });
  }
});

app.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  //   app.get("*", (req, res) =>
  //     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  //   );

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(PORT);

console.log("Listening on 8888");
