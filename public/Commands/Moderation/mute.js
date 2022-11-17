module.exports = {
  name: 'mute',
  aliases: [],
  description: 'Mutes a specified user.',
  userPermissions: ['MODERATE_MEMBERS'],
  botPermissions: ['MANAGE_ROLES'],
  execute: async (client, message, args, db) => {
    
    if (args.length == 0) return message.reply("You need to specify someone to mute.")

    const muteRole = await db.get(`muterole_${message.guild.id}`);
    
    if (!muteRole) return message.reply("You need to set a mute-role to be able to do that. Run `d.help muterole` to learn how to create/set one!")

    let target = await message.guild.members.fetch({ query: args[0], limit: 1 }).then(members => members.first()) || await message.mentions.members.first() || await message.guild.members.cache.find(u => u.id == args[0]);

    if (!target) return message.reply("That user doesn't exist.")

    if (!target.manageable) return message.reply('I do not have control over that user.')

    if (target.roles.highest.position >= message.member.roles.highest.position) return message.reply('You cannot mute this user!')

    if (target.roles.cache.some(r => r.id === muteRole.toString())) return message.reply("That user is already muted.")

    try {
      target.roles.add(muteRole.toString(), args.length > 1 ? args.slice(1,args.length).join(` `) : `Muted by ${message.author.tag}`)
        .then(user => message.reply(`Muted ${user.user.tag}!`))
    } catch {
      e => message.reply("Some error occured while trying to process your request.") 
    }

  }
}