const client = require("../index");
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
			members: await guild.members.cache,
			roles: await guild.roles.cache,
			channels: await guild.channels.cache,
			emotes: await guild.emojis.cache
		}
		client.servers.set(guild.id, obj)
	})
	
});