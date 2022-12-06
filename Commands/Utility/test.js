// const translate_emotes = require('../../Models/emote-translator')

// module.exports = {
// 	name: "test",
// 	aliases: [],
// 	description: "Test",
// 	execute: async (client, message, args, db) => {

// 		let arg = args[0]
// 		if (!arg) return
// 		// const emotes = client.servers.get(message.guild.id).emotes
// 		// console.log(emotes.first())
		
// 		message.channel.send(translate_emotes(arg, message.guild))

// 		// message.reply({
// 		// 	content: arg.replace(/<|a|:|>|\d{18}/g,"")
// 		// })
		
// 		// const emotes = client.servers.get(message.guild.id).emotes
// 		// emotes.forEach(e => console.log(e.name))
		
// 	}
// }