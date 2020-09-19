const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect to the Database
connectDB();

//init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "Hello World" }));
const PORT = process.env.PORT || 5000;

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/playlists", require("./routes/playlists"));

app.listen(PORT, () => console.log(`server has started on port ${PORT}`));
