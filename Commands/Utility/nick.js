const { misc, kanna, arrows } = require('../../Utilities/emotes')
const { EmbedBuilder, quote } = require('discord.js')

module.exports = {
	name: 'nick',
	aliases: [],
	usage: '<set/reset> <user> <new nickname if setting>',
	description: 'Sets or resets a specified user\'s nickname.',
	botPermissions: ['ManageNicknames'],
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

		if (!args.length || args.length < 1) return err('Specify a paramater.')
		
		const param = args[0]?.toLowerCase()
		if (!params.some(p => p === param)) return err("Not a valid parameter.")

		const arg = await message.mentions?.members?.first()?.id || args[1] || null
		if (!arg) return err('Specify a valid user.')

		const user = message.guild.members.cache.find(m => m.id == arg) || null
		if (!user) return err('That\'s not a valid member.')

		if ((user.roles.highest.position >= message.member.roles.highest.position) && (user.id !== message.author.id)) return err('You can\'t change this member\'s nickname.')
		if (!user.manageable) return err('I can\'t change that member\'s nickname.')

		const original = user.displayName

		if (param === 'set') {

			if (!args[2]) return err('Specify what you want the new nickname to be.')
			const new_nick = args.slice(2, args.length).join(` `)

			user.setNickname(new_nick)
			.then(u => message.reply({
				embeds: [
					new EmbedBuilder()
						.setColor(0x2f3136)
						.setTitle(`Nickname Set ${kanna.comfy}`)
						.setDescription(`${user.toString()}\n${quote(`${original} ${arrows.pink} ${u.displayName}`)}`)
				],
				allowedMentions: { repliedUser: false }
			}))
			
		}
		if (param === 'reset') {

			user.setNickname(null)
			.then(u => message.reply({
				embeds: [
					new EmbedBuilder()
						.setColor(0x2f3136)
						.setTitle(`Nickname Reset ${kanna.comfy}`)
						.setDescription(`${user.toString()}\n${quote(`${original} ${arrows.pink} ${u.displayName}`)}`)
				],
				allowedMentions: { repliedUser: false }
			}))
			
		}

		
	}
}