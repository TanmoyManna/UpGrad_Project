// This will be the starting point of the application

const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

var cors = require('cors') 
app.use(cors())

// To convert JSON to Js Objects and vice versa
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * Plugging in the routes
 */
 require("./routes/auth.route")(app);

// To start  our server
app.listen(serverConfig.PORT, () => {
  console.log(`Server started on port ${serverConfig.PORT}`);
});

// To connect to the databse
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(dbConfig.DB_URL, connectionOptions);
const DB = mongoose.connection;
DB.on("error", () => {
  console.log("Error while connecting to the database");
});
DB.once("open", () => {
  console.log("Successfully connected to the database");
});