const { EmbedBuilder } = require('discord.js')

module.exports = {
	name: "test",
	aliases: [],
	description: "Test",
	execute: async (client, message, args, db) => {

		message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setTitle(null)
					.setDescription('okay')
			]
		})
		
	}
}