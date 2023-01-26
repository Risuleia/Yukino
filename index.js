// Dependencies
require('dotenv').config()
const { Client, Collection, IntentsBitField, Partials } = require("discord.js");
const fs = require('fs');
const mongoose = require('mongoose');

// Creating the client
const intents = [
	"Guilds",
	"GuildMembers",
	"GuildBans",
	"GuildEmojisAndStickers",
	"GuildIntegrations",
	"GuildWebhooks",
	"GuildInvites",
	"GuildVoiceStates",
	"GuildPresences",
	"GuildMessages",
	"GuildMessageReactions",
	"GuildMessageTyping",
	"DirectMessages",
	"DirectMessageReactions",
	"DirectMessageTyping",
	"MessageContent",
	"GuildScheduledEvents",
	"AutoModerationConfiguration",
	"AutoModerationExecution"
]
const partials = [
	Partials.Channel,
	Partials.GuildMember,
	Partials.GuildScheduledEvent,
	Partials.Message,
	Partials.Reaction,
	Partials.ThreadMember,
	Partials.User
]
const client = new Client({
	intents: new IntentsBitField(intents),
	partials: partials,
	failIfNotExists: false,
});
module.exports = client;


// Web server
const alive = require('./server');

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/");
client.config = require("./config.json");
client.snipes = new Collection();
client.rsnipes = new Collection();
client.esnipes = new Collection();
client.afk = new Collection();
client.servers = new Collection();

// mongoose
const mongooseConnectionString = process.env.MONGOOSECONNECTIONSTRING
if (!mongooseConnectionString) return;

mongoose.connect(mongooseConnectionString)
	.then(() => {
		console.log('Connected to MongoDB');

		// Initializing the project
		require("./Handlers")(client);
		
		// Starting up the web server
		alive(client)
		
		// Logging in
		const token = process.env.TOKEN;
		client.login(token);
	});