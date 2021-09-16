// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes

const compress = require("compression");
const cors = require("cors");
const cookieParser = "cookie-parser";
const http = require("http");
const debug = require("debug");

// Start up an instance of app
const express = require("express");
const app = express();

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

// Spin up the server
app.set("port", 5000);
const server = http.createServer(app);
server.listen(5000, (err) => {
  if (err) {
    console.log("Error");
  } else {
    console.info("Server started on port %s.", config.port);
  }
});

server.on("error", onError);
server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
});

// Callback to debug

// Initialize all route with a callback function
app.get("/", (req, res) => {
  res.send("Hello");
});
// Callback function to complete GET '/all'

// Post Route
