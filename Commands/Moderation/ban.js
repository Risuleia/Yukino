module.exports = {
  name: 'ban',
  aliases: [],
  description: 'Bans a specified user from the guild.',
  userPermissions: ['BAN_MEMBERS'],
  botPermissions: ['BAN_MEMBERS'],
  execute: async (client, message, args, db) => {
    
    if (args.length == 0) return message.reply("You need to specify someone to ban.")

    let target = await message.guild.members.fetch({ query: args[0], limit: 1 }).then(members => members.first()) || await message.mentions.members.first() || await message.guild.members.cache.find(u => u.id == args[0]);

    if (!target) return message.reply("That user doesn't exist.")

    if (!target.manageable) return message.reply('I do not have control over that user.')

    if (target.roles.highest.position >= message.member.roles.highest.position) return message.reply('You cannot ban this user!')

    try {
      target.ban({ reason: args.length > 1 ? args.slice(1,args.length).join(` `) : `Banned by ${message.author.tag}` })
        .then(banInfo => message.reply(`Banned ${banInfo.user.tag} from ${message.guild.name}!`))
    } catch {
      e => message.reply("Some error occured while trying to process your request.") 
    }

  }
}