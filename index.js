const express = require("express");
const userNewsRoutes = require("./src/router/UserNews");
const { signup, signin } = require("./src/controllers/AuthController");
require("dotenv").config();

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the News Aggregator");
});

app.post("/signup", signup);

app.post("/signin", signin);

app.use("/users/:id/news", userNewsRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error while running server on the PORT ${PORT}`);
  }
  console.log(`Server is running on the PORT ${PORT}`);
});
