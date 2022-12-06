const create = require('./embed')
const db = require('../db')

const sendboost = async (author, chan) => {

	if (!chan || !author) return

	const embeds = await db.get('embeds')
	const conf = await db.get('serverconf')

	let boostemb = conf.boost_emb
	if (!boostemb) return
	
	let emb = embeds.find(e => e.name == boostemb)
	if (!emb) return

	create(chan, emb, author)
	
}

module.exports = sendboost