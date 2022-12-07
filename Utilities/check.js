const client = require("../index")
const db = require("../db")

const check = async () => {
    // db
	const mariposa = client.guilds.cache.find(g => g.id == '879726321155051530')
	const embeds = await db.get('embeds')
	const conf = await db.get('serverconf')
	Object.keys(conf).forEach(key => {
		console.log(mariposa.roles.cache.some(r => r.id === conf[key]) || mariposa.channels.cache.some(c => c.id === conf[key]))
        // console.log(conf)
	})
}

module.exports = check