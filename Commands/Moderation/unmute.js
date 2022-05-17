module.exports = {
  name: 'unmute',
  aliases: [],
  description: 'Unmutes a specified user.',
  userPermissions: ['MANAGE_ROLES'],
  botPermissions: ['MANAGE_ROLES'],
  execute: async (client, message, args, db) => {
    
    if (args.length == 0) return message.reply("You need to specify someone to unmute.")

    const muteRole = await db.get('muterole');
    
    if (!muteRole) return message.reply(`You need to set a mute-role to be able to do that. Run \`${client.config.prefix}help muterole\` to learn how to create/set one!`)

    let target = await message.guild.members.fetch({ query: args[0], limit: 1 }).then(members => members.first()) || await message.mentions.members.first() || await message.guild.members.cache.find(u => u.id == args[0]);

    if (!target) return message.reply("That user doesn't exist.")

    if (!target.manageable) return message.reply('I do not have control over that user.')

    if (!target.roles.cache.some(r => r.id === muteRole.toString())) return message.reply("That user is not muted.")

    try {
      target.roles.remove(muteRole.toString(), args.length > 1 ? args.slice(1,args.length).join(` `) : `Muted by ${message.author.tag}`)
        .then(user => message.reply(`Unmuted ${user.user.tag}!`))
    } catch {
      e => message.reply("Some error occured while trying to process your request.") 
    }

  }
}