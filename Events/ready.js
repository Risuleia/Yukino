const db = require("../db");
const client = require("../index");
const check = require("../Utilities/check");
const status = require("../Utilities/status")

client.on("ready", async () => {

  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setStatus('idle');
	setInterval(() => {
		status(client)
	}, 30000)

	const guilds = client.guilds.cache
	guilds.forEach(async guild => {
		const obj = {
			guild: guild,
			members: await guild.members.fetch(),
			roles: await guild.roles.fetch(),
			channels: await guild.channels.fetch(),
			emotes: await guild.emojis.fetch()
		}
		client.servers.set(guild.id, obj)
	})

	check()
	
});