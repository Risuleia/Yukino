const client = require("../index")
const db = require("../db")

const check = async () => {
	
	const mariposa = client.guilds.cache.find(g => g.id == '879726321155051530')
	const embeds = await db.get('embeds')
	const conf = await db.get('serverconf')

	if (!conf) return
	
	Object.keys(conf).forEach(key => {
		
		if (!(mariposa.roles.cache.some(r => r.id === conf[key]) || mariposa.channels.cache.some(c => c.id === conf[key]) || embeds.some(emb => emb.name === conf[key]))) conf[key] = null
		else return
		
	})
}

module.exports = check
