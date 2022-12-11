const sendboost = require('../../Utilities/sendboost')

module.exports = {
	name: "testboost",
	aliases: [],
	description: "Tests the boost message.",
	userPermissions: ['ADMINISTRATOR'],
	execute: async (client, message, args, db) => {

		const conf = await db.get('serverconf')
		const chan_id = conf.boost
		if (!chan_id) return message.channel.send({
			content: "no boost channel hasn't been set yet",
			reply: { messageReference: message.id }
		})

		const boost_chan = await message.guild.channels.cache.find(c => c.id === chan_id)

		const emb = conf.boost_emb
		if (!emb) return message.channel.send({
			content: "no boost embed hasn't been set yet",
			reply: { messageReference: message.id }
		})

		sendboost(message.member, boost_chan)
		
	}
}