const { User } = require('discord.js')
const placeholders = require('./placeholders')

const translate = async (user, guild, chan, str) => {

    const replace = async (str) => {
        return await str.replace(/{(\w+)}/gm, async function(matched) {
            return await placeholders[matched.replace(/{|}/g,"")].call(user, guild, chan)
        })
    }
    return await replace(str)
    
}

module.exports = translate