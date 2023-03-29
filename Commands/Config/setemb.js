const { EmbedBuilder } = require('discord.js')
const { misc, bounceheart, arrows } = require('../../Utilities/emotes')

module.exports = {
	name: "setemb",
	aliases: ['sete'],
	description: "Set an embed to be sent on boost or member join.",
	usage: "<boost/join> <emb>",
	userPermissions: ['Administrator'],
	dm: false,
	execute: async (client, message, args, db) => {

		const chan = message.channel

		const param = ['join', 'welcome', 'boost']

		const err = (str) => {
			message.reply({
				embeds: [
						new EmbedBuilder()
							.setColor(0x2f3136)
							.setDescription(`${misc.catstanding} _${str}_`)
					]
			})
		}

		if (!args.length || args.length < 1) return err("Specify a parameter.")
		
		const arg = args[0]?.toLowerCase()
		if (!param.some(p => p === arg)) return err("Not a valid parameter.")
		
		const settings = {
			welcome: "welcome_emb",
			join: "welcome_emb",
			boost: "boost_emb"
		}

		const setting = args[1]
		if (!setting) return err("Provide something to set.")

		const embeds = await db.get("embeds")
		const conf = await db.get('serverconf')

		if (!embeds.some(emb => emb.name == setting) && setting?.toLowerCase() != "remove") return err("Not a valid option.")
																
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
				color: 0x2f3136,
				title: headings[arg],
				description: `${bounceheart.blue} ${!original ? "_None_" : original} ${arrows.pink} ${!conf[settings[arg]] ? "_None_" : setting}`
			}]
		})
		
	}
}