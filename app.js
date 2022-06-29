import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import mainRoutes from "./server/routes/main.js";
import cors from "cors";

import createError from "http-errors";
import "dotenv/config";
// import authRouter from "./server/src/auth/auth.router.js";

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use("/api/", mainRoutes);

var dev_db_url = "mongodb://localhost:27017/amt-system";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose
  .connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB not connect", err));
mongoose.Promise = global.Promise;
export var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

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

//

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("APP IS RUNNING");
// });
// // app.use("/auth", authRouter);

// app.use((req, res, next) => {
//   next(createError(404));
// });

// app.use((err, req, res) => {
//   console.log(err.stack);
//   res.status(err.status || 500).send(err.message);
// });

// const server = app.listen(process.env.PORT, () => {
//   console.log(`Express running → PORT ${server.address().port}`);
// });
