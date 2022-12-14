const client = require('../index')
const Regex = require('./regex')

const translate_emotes = (str, guild) => {

	const emotes = client.servers.get(guild.id).emotes
	let regex = Regex.emotes

	const findemote = (match) => {
		let name = match.replace(/<|(<a)|:|>|\d{17,20}/g,"")
		const emote = emotes.find(e => e.name == name)
		if (!emote) return match
		else return emote
	}
	
	return str.replace(regex, function(matched) {
		return findemote(matched).toString()
	})
	
}

module.exports = translate_emotes