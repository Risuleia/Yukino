const client = require('../index');
const Database = require("@replit/database");
const db = new Database();

const emptyArr = []

client.on('guildCreate', guild => {
  db.set('censored_words', emptyArr)
})