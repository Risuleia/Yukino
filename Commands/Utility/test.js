const translate_emotes = require('../../Models/emote-translator')

module.exports = {
	name: "test",
	aliases: [],
	description: "Test",
	execute: async (client, message, args, db) => {

		console.log(message.guild.premiumTier)
		
	}
}