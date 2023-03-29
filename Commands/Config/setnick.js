const { misc, kanna, bounceheart, arrows } = require('../../Utilities/emotes')
const { EmbedBuilder } = require('discord.js')

module.exports = {
	name: 'setnick',
	aliases: ['setn'],
	usage: '<new nickname/"remove">',
	description: 'Sets or resets the bot username.',
	userPermissions: ['Administrator'],
	dm: false,
	execute: async (client, message, args, db) => {

		const params = ['set', 'reset']

		const err = (str) => {
			message.reply({
				embeds: [
						new EmbedBuilder()
							.setColor(0x2f3136)
							.setDescription(`${misc.catstanding} _${str}_`)
					]
			})
		}

		if (!args.length || args.length < 1) return err('That\'s not the correct usage of this command.')
		
		const user = await message.guild.members.fetchMe()

		const original = user.displayName

		if (args[0] === 'remove' && args.length === 1) {

			user.setNickname(null)
			.then(u => message.reply({
				embeds: [
					new EmbedBuilder()
						.setColor(0x2f3136)
						.setDescription(`_Nickname reset._ ${kanna.comfy}`)
				],
				allowedMentions: { repliedUser: false }
			}))
			return
			
		}

		const new_nick = args.slice(0, args.length).join(` `)

		user.setNickname(new_nick)
		.then(u => message.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(0x2f3136)
					.setTitle(`New Nickname Set`)
					.setDescription(`${bounceheart.purple} ${original} ${arrows.pink} ${u.displayName}`)
			],
			allowedMentions: { repliedUser: false }
		}))
		
	}
}