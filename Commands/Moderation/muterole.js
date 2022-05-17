module.exports = {
  name: 'muterole',
  aliases: [],
  description: 'Created a mute-role or sets one if specified.',
  userPermissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
  botPermissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
  execute: async (client, message, args, db) => {

    const muteRole = await db.get('muterole');

		const subcmd = ['create', 'add', 'set', 'show', 'reset', 'delete']

		const param = args[0].toLowerCase()

		if (subcmd.slice(0,2).some(cmd => param == cmd)) {

			if (muteRole) return message.channel.send({
				content: 'A mute-role has already been set.',
				reply: { messageReference: message.id }
			})

			try {
				message.guild.roles.create({
					name: args?.slice(1,args.length)?.join(` `) ||  'Muted',
					color: 'RED',
					reason: 'mute-role'
				}).then(role => {

					db.set(`muterole_${message.guild.id}`, role.id)

					message.guild.channels.cache.forEach(channel => {
						channel.permissionOverwrites.create(role, {
							SEND_MESSAGES: false
						})
					})
	
					message.channel.send({
						content: `Mute-role set to ${role}!`,
						reply: { messageReference: message.id },
						allowedMentions: { repliedUser: false, roles: false }
					})
					
				})
			} catch (err) {
				message.channel.send({
					content: 'An error occured while trying to process your request.',
					reply: { messageReference: message.id }
				})
				throw err
			}
			
		}
		else if (param == subcmd[2]) {

			if (!args.length || args.length < 2) return message.channel.send({
				content: 'You need to specify a role to set as the mute-role.',
				reply: { messageReference: messasge.id }
			})

			let role = await message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args.slice(1,args.length).join(` `).toLowerCase())) || await message.mentions.roles.first() || await message.guild.roles.cache.find(r => r.id == args[1]);

			if (!role) return message.channel.send({
				content: 'That role doesn\'t exist.',
				reply: { messageReference: message.id }
			})

			try {
				await db.set(`muterole_${message.guild.id}`,role.id)

				message.guild.channels.cache.forEach(channel => {
					channel.permissionOverwrites.create(role, {
						SEND_MESSAGES: false
					})
				})

				message.channel.send({
					content: `Mute-role set to ${role}!`,
					reply: { messageReference: message.id },
					allowedMentions: { repliedUser: false, roles: false}
				})
			} catch (err) {
					message.channel.send({
						content: 'An error occured while rying to process your request.',
						reply: { messageReference: message.id }
				})
			}
			
		}
		else if (param == subcmd[3]) {
			
			const role = await message.guild.roles.cache.find(r => r.id == muteRole)
			
			const embed = {
				color: 0xE6D0CE,
				description: role ? `Current mute-role is ${role}` : `No mute-role set!`
			}

			message.channel.send({
				embeds: [embed],
				reply: { messageReference: message.id },
				allowedMentions: { repliedUser: false }
			})
			
		}
		else if (param == subcmd[4] || param == subcmd[5]) {
			db.delete(`muterole_${message.guild.id}`)
			message.channel.send({
				content: 'Reset the mute-role!',
				reply: { messageReference: message.id },
				allowedMentions: { repliedUser: false }
			})
		}
		else return message.channel.send({
			content: 'Not a valid parameter.',
			reply: { messageReference: message.id }
		})
		
  }
}