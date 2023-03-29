const { bounceheart, hearts } = require('./emotes')

const hello = async (client, msg, db) => {

	if (!client || !msg) return
	
	const mimi = await client.users.fetch("800686782114693180")

	const conf = await db.get('serverconf')
	const PREFIX = !conf?.prefix ? client.config.prefix : conf.prefix

	const content = `_Hey there, cutie!_ ${hearts.blueberry}\nI'm ${client.user.username}, Mariposa's custom bot.\n\nMy prefix, currently, is _\`${PREFIX}\`_\n\n${bounceheart.purple} _Much love to you_\n${bounceheart.purple} _And, much love to my creator,_ ${mimi.toString()} !`

	return msg.reply({
			embeds: [{
					color: 0x2f3136,
					description: content
			}]
	})
	
}

module.exports = hello