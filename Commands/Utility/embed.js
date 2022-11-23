const { create, remove, edit } = require("../../Utilities/embed")
const Database = require('@replit/database')
const embcreate = require("../../Utilities/embed-utils/emb-create")
const embsend = require("../../Utilities/embed-utils/emb-send")
const embedit = require("../../Utilities/embed-utils/emb-edit")

module.exports = {
	name: "embed",
	aliases: ['emb'],
	description: "Stores, removes, edits, shows or sends an embed.",
	usage: "<add/edit/remove/send/show/list> <embed name (if used with `send`, `show`, `remove` or `edit` subcmd) <channel mention (if used with `send` subcmd)|property to edit (if used with `edit` subcmd)>",
	userPermissions: ['ADMINISTRATOR'],
	execute: async (client, message, args, db) => {

		const allowedParams = ['add', 'create', '+', 'remove', 'delete', '-', 'edit', '+=', 'send', 'show', 'list']

		const param = args[0]?.toLowerCase()

		if (!(allowedParams.some(allowedParam => allowedParam === param))) return message.channel.send({
			content: "that's not a valid parameter, see the help for this command :)",
			reply: { messageReference: message.id }
		})


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

			message.channel.send({
				embeds: [{
					color: 0xe6d0ce,
					title: "here are all the embeds:",
					description: (!embeds || !embeds.length || embeds.length == 0) ? "you dont have any embeds yet... create some pretty embeds, luv!" : embeds.map(emb => emb.name).join("\n"),
					footer: {
						text: "Yukino <3"
					}
				}],
				reply: { messageReference: message.id },
				allowedMentions: { repliedUser: false }
			})
			
		}
		
	}
}