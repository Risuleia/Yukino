const db = require('../db')
const client = require('../index')
const sendwelc = require('../Utilities/sendwelc')

client.on('guildMemberAdd', async member => {

	if (member.bot) return

	const conf = await db.get('serverconf')
	const chan_id = conf.welcome

	if (!chan_id) return
	
	const welc_chan = member.guild.channels.cache.find(c => c.id === chan_id)
	if (!welc_chan) return

	try {
		sendwelc(member, welc_chan)
	} catch (err) {
		throw err
	}
	
})