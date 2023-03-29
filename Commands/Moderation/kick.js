const { EmbedBuilder } = require('discord.js')
const { misc } = require('../../Utilities/emotes')

module.exports = {
  name: 'kick',
  aliases: [],
  description: 'Kicks a specified user from the guild.',
  userPermissions: ['KickMembers'],
  botPermissions: ['KickMembers'],
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
    
    if (args.length == 0) return err("You need to specify someone to kick.")

    let target = await message.guild.members.fetch({ query: args[0], limit: 1 }).then(members => members.first()) || await message.mentions.members.first() || await message.guild.members.cache.find(u => u.id == args[0]);

    if (!target) return err("That user doesn't exist.")

    if (!target.manageable) return err('I do not have control over that user.')

    if (target.roles.highest.position >= message.member.roles.highest.position) return err('You cannot kick this user!')

    try {
      target.kick(args.length > 1 ? args.slice(1,args.length).join(` `) : `Kicked by ${message.author.tag}`)
        .then(kickInfo => message.reply({
						embeds: [
							new EmbedBuilder()
								.setColor(0x2f3136)
								.setDescription(`_Kicked_ ${kickInfo.user.tag} _from_ ${message.guild.name}_._${misc.lower}`)
						]
				 })
			)
    } catch (error) {
      return err("Some error occured while trying to process your request.") 
    }

  }
}