const sendwelc = require('../../Utilities/sendwelc')
const { EmbedBuilder } = require('discord.js')
const { misc } = require('../../Utilities/emotes')

module.exports = {
	name: "testwelc",
	aliases: [],
	description: "Tests the welcome message.",
	userPermissions: ['Administrator'],
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
		const chan_id = conf.welcome
		if (!chan_id) return err("No welcome channel has been set yet.")

		const welc_chan = await message.guild.channels.cache.find(c => c.id === chan_id)

		const emb = conf.welcome_emb
		if (!emb) return err("No welcome embed has been set yet.")

		sendwelc(message.member, welc_chan)
		
	}
}