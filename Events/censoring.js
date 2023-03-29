const client = require('../index');
const db = require('../db')

client.on('messageCreate', async msg => {

	const conf = await db.get('serverconf')
	const PREFIX = conf.prefix || client.config.prefix
	
	if (
		msg.author.bot ||
		(msg.content.startsWith(`${PREFIX}censor`) && !msg.member.permissions.has('Administrator'))
	) return

	const censored_words = await db.get('censored_words')
	if (!censored_words) return

	if (censored_words.some(word => msg.content?.includes(word))) {
		try {
			msg.delete()
		} catch (err) {
			return
		}
	}

})