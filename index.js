// Dependencies
const { Client, Collection, IntentsBitField, Partials } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const fs = require('fs');

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
client.rsnipes = new Collection();
client.esnipes = new Collection();
client.afk = new Collection();
client.queues = new Map();
client.servers = new Collection();

// Initializing the project
require("./Handlers")(client);

// Starting up the web server
alive(client)

// Logging in
const token = process.env.TOKEN;
client.login(token);