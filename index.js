
const express = require("express");
const dataBase = require("./config/connection");
const routes = require("./routes");

// Get the current working directory
const cwd = process.cwd();

// Set the port for the API server
const PORT = 3001;

// Create an Express application
const app = express();

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the defined routes for the application
app.use(routes);

// Open a connection to the database
dataBase.once("open", () => {
  // Start the API server and listen on the specified port
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT} in directory ${cwd}!`);
  });
});
