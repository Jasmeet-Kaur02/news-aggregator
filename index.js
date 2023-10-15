const express = require("express");

const PORT = 3000;
app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the News Aggregator");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error while running server on the PORT ${PORT}`);
  }
  console.log(`Server is running on the PORT ${PORT}`);
});
