module.exports = {
	name: "setemb",
	aliases: ['sete'],
	description: "Set an embed to be sent on boost or member join.",
	usage: "<boost/join> <emb>",
	userPermissions: ['ADMINISTRATOR'],
	execute: async (client, message, args, db) => {

		const chan = message.channel

		const param = ['join', 'welcome', 'boost']

		if (!args.length || args.length < 1) return chan.send({
				content: "specify a parameter",
				reply: { messageReference: message.id }
		})
		
		const arg = args[0]?.toLowerCase()
		if (!param.some(p => p === arg)) return chan.send({
				content: "not a valid parameter",
				reply: { messageReference: message.id }
		})
		const settings = {
			welcome: "welcome_emb",
			join: "welcome_emb",
			boost: "boost_emb"
		}

		const setting = args[1]
		if (!setting) return chan.send({
				content: "provide something to set",
				reply: { messageReference: message.id }
		})

		const embeds = await db.get("embeds")
		const conf = await db.get('serverconf')

		if (!embeds.some(emb => emb.name == setting) && setting?.toLowerCase() != "remove") return chan.send({
			content: "not a valid option",
			reply: { messageReference: message.id }
		})
																
		const original = conf[settings[arg]]
		conf[settings[arg]] = setting?.toLowerCase() == "remove" ? null : setting
		await db.set('serverconf', conf)

		const headings = {
				join: "Welcome Embed",
				welcome: "Welcome embed",
				boost: "Boost Embed"
		}

		chan.send({
			embeds: [{
				color: 0xe6d0ce,
				title: headings[arg],
				description: `${!original ? "_None_" : setting} → ${!conf[settings[arg]] ? "_None_" : setting}`
			}]
		})
		
	}
}