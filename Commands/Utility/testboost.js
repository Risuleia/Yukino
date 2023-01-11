const sendboost = require('../../Utilities/sendboost')
const { EmbedBuilder } = require('discord.js')
const { misc } = require('../../Utilities/emotes')

module.exports = {
	name: "testboost",
	aliases: [],
	description: "Tests the boost message.",
	userPermissions: ['ADMINISTRATOR'],
	dm: false,
	execute: async (client, message, args, db) => {

		const err = (str) => {
			message.reply({
				embeds: [
						new EmbedBuilder()
							.setColor(0x2f3136)
							.setDescription(`${misc.catstanding} _${str}_`)
					]
			})
		}

		const conf = await db.get('serverconf')
		const chan_id = conf.boost
		if (!chan_id) return err("No boost channel has been set yet.")

		const boost_chan = await message.guild.channels.cache.find(c => c.id === chan_id)

		const emb = conf.boost_emb
		if (!emb) return err("No boost embed has been set yet.")

		sendboost(message.member, boost_chan)
		
	}
}