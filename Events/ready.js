const client = require("../index");
const check = require("../Utilities/check")
const status = require("../Utilities/status")
const moment = require("moment-timezone")

client.once("ready", async () => {

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

	console.log(`Logged in as ${client.user.tag}!`);
  client.user.setStatus('idle');

	const bday = 'Jan 27'
	const tdy = moment.tz('Asia/Dubai').format('ll')
	if (tdy.includes(bday)) return client.user.setActivity('happy birthday, mimi!!!')
	else setInterval(() => {
		status(client)
	}, 30000)

});