# Perfect Playback For Spotify

Suggests 100 playlist ideas based on a keyword and adds chosen tracks to the user’s Spotify playlist

## Usage

Open [https://perfectplayback.herokuapp.com/](https://perfectplayback.herokuapp.com/) on your browser and login in with Spotify to find your desired playlist

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- A text editor (eg. [VS code](https://code.visualstudio.com/))

### Setup

To run this project, install it locally using npm.

1. Open your terminal and `cd` into the server directory in server

```
$ cd ../perfectplayback
```

2. Install both server and client dependencies

```
$ npm install
$ cd client
$ npm install
$ cd ../
```

3. Create a `.env` file in the root folder with the following attributes:

```
REACT_APP_SPOTIFY_CLIENT_ID=<your id>
REACT_APP_SPOTIFY_CLIENT_SECRET=<your secret>
```

4. Use the command below to concurrently run both the server and the client

```
$ npm run dev

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
