const { remove } = require("../../Utilities/embed")
const embcreate = require("../../Utilities/embed-utils/emb-create")
const embsend = require("../../Utilities/embed-utils/emb-send")
const embedit = require("../../Utilities/embed-utils/emb-edit")
const { misc, dots, hearts, kanna } = require('../../Utilities/emotes')
const { EmbedBuilder } = require('discord.js')

module.exports = {
	name: "embed",
	aliases: ['emb'],
	description: "Stores, removes, edits, shows or sends an embed.",
	usage: "<add/edit/remove/send/show/list> <embed name (if used with `send`, `show`, `remove` or `edit` subcmd) <channel mention (if used with `send` subcmd)|property to edit (if used with `edit` subcmd)>",
	userPermissions: ['Administrator'],
	dm: false,
	execute: async (client, message, args, db) => {

		const err = (str) => {
			message.reply({
				embeds: [
						new EmbedBuilder()
							.setColor(0x2f3136)
							.setDescription(`${misc.catstanding} _${str}_`)
					]
			})
		}

		const allowedParams = ['add', 'create', '+', 'remove', 'delete', '-', 'edit', '+=', 'send', 'show', 'list']

		const param = args[0]?.toLowerCase()

		if (!(allowedParams.some(allowedParam => allowedParam === param))) return err("That's not a valid parameter.")


		//  subcmds
		if (["add", "create", "+"].some(p => p === param)) {
			embcreate(message)
		}

		if (["edit", "+="].some(p => p === param)) {
			embedit(message, args)
		}

		if (["remove", "delete", "-"].some(p => p === param)) {
			remove(message, args[1])
		}

		if (param === "send") {
			embsend(message, args)
		}

		if (param === "show") {
			embsend(message, args)
		}
		
		if (param === "list") {

			const embeds = await db.get('embeds')

			message.reply({
				embeds: [
					new EmbedBuilder()
						.setColor(0x37393e)
						.setTitle(`${hearts.blueberry} Here are all the embeds:`)
						.setDescription((!embeds || !embeds.length || embeds.length == 0) ? `${kanna.prayinghappy}_you dont have any embeds yet... create some pretty embeds, luv!_` : `${embeds.map(emb => `${dots.flower} ${emb.name}`).join("\n")}`)
				],
				allowedMentions: { repliedUser: false }
			})
			
		}
		
	}
}