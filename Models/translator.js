const placeholders = require('./placeholders')

const translate = (user, guild, chan, str) => {

	if (!user || !guild || !chan) return str

	return str.toString().replace(/{(\w+)}/gm, (matched) => {
		const val = placeholders[matched.replace(/{|}/g,"")](user, guild, chan)
			return val
		
	})
    
}

module.exports = translate