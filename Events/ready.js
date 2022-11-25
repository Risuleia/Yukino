const client = require("../index");

client.on("ready", async () => {
	
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('i love mimi <333')
  client.user.setStatus('idle');

	const guilds = await client.guilds.cache
	guilds.forEach(guild => client.servers.set(guild.id, guild))
	
});