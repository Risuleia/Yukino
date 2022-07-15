// Dependencies
const { Client, Collection } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const fs = require('fs');
const Database = require("@replit/database")
const db = new Database()

// Creating the client
const client = new Client({
	intents: 32767,
});
module.exports = client;

// Creating the voice client
client.distube = new DisTube(client, {
	emitNewSongOnly: true,
	leaveOnFinish: true,
	emitAddSongWhenCreatingQueue: false,
	plugins: [new SpotifyPlugin()]
})


// Web server
const alive = require('./server');

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/");
client.config = require("./config.json");
client.snipes = new Collection();
client.react_snipes = new Collection();
client.edit_snipes = new Collection();
client.afk = new Collection();
client.queues = new Map()

// Initializing the project
require("./Handlers")(client);

// Starting up the web server
alive(client)

// Logging in
const token = process.env.TOKEN;
client.login(token);