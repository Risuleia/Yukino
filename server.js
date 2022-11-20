const express = require('express');

const server = express();

server.all("/", (req, res) => {
  res.send("Web server for the bot is online!")
});

function alive() {
  server.listen(3000, () => {
    console.log("Web server for the bot is ready!")
  })
}

module.exports = alive;