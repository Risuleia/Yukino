const { ActivityType } = require('discord.js')

module.exports = {
	name: "test",
	aliases: [],
	description: "Test",
	execute: async (client, message, args, db) => {

		return console.log(message.guild)
		// const id = await db.get('serverconf').boost
		// const chan = message.guild.channels.cache.find(c => c.id == id)
		// console.log(message.guild.vanityURLCode())
		
	}
}