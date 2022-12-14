const { EmbedBuilder } = require('discord.js')
const Regex = require('../../Models/regex')
const { closemail } = require('../../Utilities/modmail')

module.exports = {
    name: "closemail",
    aliases: ['closem'],
    description: "Closes a modmail channel.",
    usage: "<user_id>",
    dm: false,
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: ['MANAGE_CHANNELS', 'MANAGE_THREADS'],
    execute: async (client, message, args, db) => {

        const mariposa = client.guilds.cache.find(g => g.id === '879726321155051530')
        const modmail_id = await db.get('serverconf').modmail
        const modmail = mariposa.channels.cache.find(c => c.id === modmail_id)

        if (!modmail) return
        
        if (!args || !args.length || !args.length < 0) return message.reply('pls provide a valid user id')

        const id = args[0]
        if (!Regex.id.test(id)) return message.reply('pls provide a valid user id')

        const members = mariposa.members.cache
        const bans = mariposa.bans.cache

        if (!(members.find(u => u.id === id) || bans.find(b => b.user.id === id))) return message.reply('that\'s not a valid user')

        const user = await client.users.fetch(id)

        const desc = `**Mail Deleted**\n\n**User**: ${user.username}#${user.discriminator}\n**ID**: ${id}`

        closemail(message, id)
        modmail.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('e6d0ce')
                    .setAuthor({ name: mariposa.name, iconURL: mariposa.iconURL({ dynamic: true }) })
                    .setTitle('Modmail Utility')
                    .setDescription(desc)
                    .setFooter({ text: `Deleted by ${message.author.tag}` })
                    .setTimestamp(Date.now())
            ]
        })

    }
}