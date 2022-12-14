const db = require('../db')
const client = require('../index')
const sendboost = require('../Utilities/sendboost')

client.on('guildMemberUpdate', async (oldMember, newMember) => {

	if (oldMember.bot) return

	const conf = await db.get('serverconf')
	const chan_id = conf.boost

	if (!chan_id) return
	
	const boost_chan = oldMember.guild.channels.cache.find(c => c.id === chan_id)
	if (!boost_chan) return

    // const boostrole = oldMember.guild.roles.premiumSubscriberRole || null
    // if (!boostrole) return

    if (!newMember.roles.premiumSubscriberRole) return

	try {
		sendboost(newMember, boost_chan)
	} catch (err) {
		throw err
	}
	
})