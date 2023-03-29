const { EmbedBuilder } = require('discord.js')
const { misc } = require('../../Utilities/emotes')

module.exports = {
  name: 'mute',
  aliases: [],
  description: 'Mutes a specified user.',
  userPermissions: ['ModerateMembers'],
  botPermissions: ['ManageRoles'],
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
    
    if (args.length == 0) return err("You need to specify someone to mute.")

    const muteRole = await db.get('serverconf').muterole;
    
    if (!muteRole) return err(`You need to set a mute-role to be able to do that. Run \`${client.config.prefix}help muterole\` to learn how to create/set one!`)

    let target = await message.guild.members.fetch({ query: args[0], limit: 1 }).then(members => members.first()) || await message.mentions.members.first() || await message.guild.members.cache.find(u => u.id == args[0]);

    if (!target) return err("That user doesn't exist.")

    if (!target.manageable) return err('I do not have control over that user.')

    if (target.roles.highest.position >= message.member.roles.highest.position) return err('You cannot mute this user!')

    if (target.roles.cache.some(r => r.id === muteRole.toString())) return err("That user is already muted.")

    try {
      target.roles.add(muteRole.toString(), args.length > 1 ? args.slice(1,args.length).join(` `) : `Muted by ${message.author.tag}`)
        .then(user => message.reply({
						embeds: [
							new EmbedBuilder()
								.setColor(0x2f3136)
								.setDescription(`_Muted_ ${user.user.tag}_._ ${misc.stfu}`)
						]
				 }))
    } catch (error) {
      return err("Some error occured while trying to process your request.") 
    }

  }
}