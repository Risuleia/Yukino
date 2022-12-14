const { blockQuote, underscore, quote } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { numbers } = require("../../Utilities/emotes")
const { addmail } = require("../../Utilities/modmail")

module.exports = {
    name: "sendmail",
    aliases: [],
    description: "Sends a mail to staff of the server.",
    usage: "<message>",
    dm: true,
    execute: async (client, message, args, db) => {
        
        if (!message.channel.isDMBased) return message.channel.send({
            content: "This command can only be used in DMs with the bot.",
            reply: { messageReference: message.id }
        })

        const user = message.author

        const mariposa = client.guilds.cache.find(g => g.id == '879726321155051530')

        const members = mariposa.members.cache
        const bans = mariposa.bans.cache

        if (!(members.find(u => u.id === user.id) || bans.find(b => b.user.id === user.id))) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('ac94f4')
                    .setAuthor({ name: mariposa.name, iconURL: mariposa.iconURL({ dynamic: true }) })
                    .setTitle('Modmail Utility')
                    .setDescription(`**Apologies!**\n\nThis utility is only available for those who're or were a member of Mariposa.`)
                    .setTimestamp(Date.now())
            ]
        })

        addmail(message, user)

    }
}