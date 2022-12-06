const sendwelc = require('../../Utilities/sendwelc')

module.exports = {
	name: "testwelc",
	aliases: [],
	description: "Tests the welcome message.",
	userPermissions: ['ADMINISTRATOR'],
	execute: async (client, message, args, db) => {

		const conf = await db.get('serverconf')
		const chan_id = conf.welcome
		if (!chan_id) return message.channel.send({
			content: "no welcome channel hasn't been set yet",
			reply: { messageReference: message.id }
		})

		const welc_chan = await message.guild.channels.cache.find(c => c.id === chan_id)

		const emb = conf.welcome_emb
		if (!emb) return message.channel.send({
			content: "no welcome embed hasn't been set yet",
			reply: { messageReference: message.id }
		})

		sendwelc(message.member, welc_chan)
		
	}
}