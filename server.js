// Setup empty JS object to act as endpoint for all routes
// Empty JS Array for endpoint for all routes
projectData = [];

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

// Express to use body-parser middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static("website"));

// Setup and Start the Server
const port = 8080;
const server = app.listen(port, listening);

function listening() {
  console.log(`The server is running on localhost: ${port}`);
}

// Initialize all route with a callback function (GET and POST)
app.get("/data", sendData);

// Callback function to complete GET '/data'
function sendData(req, res) {
  res.send(projectData);
  projectData = [];
}

// Post Route
app.post("/newData", addData);

function addData(req, res) {
  console.log(req.body);
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  projectData.push(newEntry);
}
