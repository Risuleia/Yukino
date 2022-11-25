const placeholders = require('./placeholders')

const translate = (user, guild, chan, str) => {

    const replace = (str) => {
			return str.toString().replace(/{(\w+)}/gm, (matched) => {
				const val = placeholders[matched.replace(/{|}/g,"")](user, guild, chan)
					return val
				
			})
    }
    return replace(str)
    
}

module.exports = translate