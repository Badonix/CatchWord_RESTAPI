const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const scoreRoute = require("./Routes/scores");
const cors = require("cors");
app.use(cors());
mongoose
  .connect(process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD))
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/api/scores", scoreRoute);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
