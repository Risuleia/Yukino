const db = require('../db')
const client = require('../index')
const sendboost = require('../Utilities/sendboost')

client.on('messageCreate', async message => {

	const id = await db.get('serverconf').boost
	if (!id) return
	const boost_chan = message.guild.channels.cache.find(c => c.id == id)
	if (!boost_chan) return

	if (!message.system) return
	if (!(8 <= message.type <= 11)) return

	try {
		sendboost(message.author, boost_chan)
	} catch (err) {
		return
	}
	
})