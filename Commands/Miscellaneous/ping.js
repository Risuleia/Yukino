const { EmbedBuilder } = require('discord.js')
const { misc } = require('../../Utilities/emotes.js')

module.exports = {
  name: 'ping',
  aliases: [],
  description: "Used to check if the bot is alive or not.",
  dm: true,
  execute: async (client, message, args, db) => {

		const emb = new EmbedBuilder()
				.setColor(0x2f3136)
				.setTitle(`${misc.dancing} Pong!`)
				.setDescription(
					`_**Bot Latency:** ${Date.now() - message.createdTimestamp}ms_\n_**API Latency:** ${Math.round(client.ws.ping)}ms_`
				)
		
    message.channel.send({ embeds: [emb]})
		
  }
}