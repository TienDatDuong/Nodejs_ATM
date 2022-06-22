import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import mainRoutes from "./server/routes/main.js";

// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use("/api/", mainRoutes);

// var mongoose = require("mongoose");
var dev_db_url = "mongodb://localhost:27017/amt-system";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose
  .connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB not connect", err));
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Call in installed dependencies
// set up express app
// set up port number
const port = 4001;
// set up home route
app.get("/", (request, respond) => {
  respond.status(200).json({
    message: "Welcome to Project Support 123",
  });
});

// app.use();

app.listen(port, (request, respond) => {
  console.log(`Our server is live on ${port}. Yay!`);
});
