const { EmbedBuilder } = require('discord.js')

module.exports = {
	name: 'promote',
	aliases: [],
	description: 'Promotes a specified user to a staff post.',
	usage: '<post> <user>',
	dm: false,
	userPermissions: ['ADMINISTRATOR'],
	botPermissions: ['MANAGE_ROLES'],
	execute: async (client, message, args, db) => {

		if (!args.length || args.length < 1) return message.reply('Please provide a valid post to assign the user to.')

		const conf = await db.get('serverconf')
		const posts = {
			admin: conf.admin,
			headmod: conf.headmod,
			mod: conf.mod,
			tmod: conf.tmod,
			pm: conf.pm,
			headpm: conf.headpm,
			uploader: conf.uploader,
			pollmanager: conf.pollmanager
		}
		const names = {
			admin: 'Admin',
			headmod: 'Head Mod',
			mod: 'Mod',
			tmod: 'Trial Mod',
			pm: 'PM',
			headpm: 'Head PM',
			uploader: 'Uploader',
			pollmanager: 'Poll Manager'
		}

		const param = args[0].toLowerCase()
		if (!(Object.keys(posts).some(key => key === param))) return message.reply('That\'s not a valid post.')

		const post = posts[param] ? message.guild.roles.cache.find(r => r.id == posts[param]) : null
		if (!post) return
		
		if (!args[1]) return message.reply('Please specify a user.')
		const arg = args.slice(1).join(` `)

		const user = await message.mentions.members.first() || message.guild.members.cache.find(m => m.id == args[1]) || await message.guild.members.fetch({ query: arg, limit: 1 })?.first()

		if (!user) return message.reply('No such user exists.')

		if (member.roles.highest.comparePositionTo(post) < 0) return message.reply("You do not have control over this role.")

		if (user.roles.has(post)) return message.reply("You've been already assigned to this post.")

		try {
			user.roles.add(post)
				.then(r => {
					message.channel.send({
						embeds: [
							new EmbedBuilder()
								.setColor('37393e')
								.setAuthor({ name: user.user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
								.setTitle('_Member Promoted_')
								.setDescription(`${user.toString()}\n\n|+ _${names[param]}_`)
								.setFooter({ text: `_By_ ${message.author.tag}` })
								.setTimestamp(Date.now())
						]
					})
				})
			
		} catch (err) {
			return
		}
		
	}
}