// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const config = require("./config");
const compress = require("compression");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const debug = require("debug");
const fetch = require("node-fetch");

// Start up an instance of app
const express = require("express");
const { exit } = require("process");
const app = express();

let projectData = [];

/* Dependencies */
/* Middleware*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compress());

//Here we are configuring express to use body-parser as middle-ware.
app.use(cookieParser());
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Callback to debug

// Initialize all route with a callback function

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/", (req, res) => {
  let entry = {};
  entry["feeling"] = req.body.feeling;
  entry["date"] = req.body.newDate;

  entry["temp"] = req.body.temp;
  projectData.push(entry);
  return res.redirect("http://localhost:5000");
});

app.get("/pd", (req, res) => {
  if (projectData) {
    res.send(projectData);
  } else {
    res.send("No Data To Display");
  }
});

// Spin up the server
app.set("port", config.PORT);
const server = http.createServer(app);
server.listen(config.PORT, (err) => {
  if (err) {
    console.log("Error");
  } else {
    console.info("Server started on port %s.", config.PORT);
  }
});

server.on("error", () => {
  console.log("there is an error");
});

server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
});
// Callback function to complete GET '/all'

// Post Route
