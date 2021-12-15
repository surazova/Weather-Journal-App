// Setup empty JS object to act as endpoint for all routes
// projectData = {};

// Setup Array to store data
projectData = [];

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8080;

// Start the Server
const server = app.listen(port, listening);

// Debugging
function listening() {
  console.log("The server is running");
  console.log(`Running on localhost: ${port}`);
}

// Routes (using GET and POST)
// Initialize all route with a callback function
app.get("/data", sendData);

// Callback function to complete GET '/data'
function sendData(req, res) {
  res.send(projectData);
  projectData = [];
}

// Post Route
app.post("/add", addData);

function addData(req, res) {
  console.log(req.body);
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  projectData.push(newEntry);
}
