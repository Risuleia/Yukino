const client = require('../index')

const translate_emotes = (str, guild) => {

	const emotes = client.servers.get(guild.id).emotes
	let regex = /(<a?)?:?(\w+):?(\d{18})?>?/gm

	const findemote = (match) => {
		let name = match.replace(/<|(<a)|:|>|\d{18}/g,"")
		const emote = emotes.find(e => e.name == name)
		if (!emote) return match
		else return emote
	}
	
	return str.replace(regex, function(matched) {
		return findemote(matched).toString()
	})
	
}

module.exports = translate_emotes