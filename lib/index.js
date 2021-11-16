const express = require("express");

// Constants
const PORT = 3000;

// App
const app = express();
app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/example/index.html`);
});

app.listen(PORT, "0.0.0.0");
console.log("Running on http://0.0.0.0:" + PORT);
