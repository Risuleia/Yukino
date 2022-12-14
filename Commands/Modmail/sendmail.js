const { blockQuote, underscore, quote } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { numbers } = require("../../Utilities/emotes")

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

        const members = mariposa.members.fetch({ force: true })
        const bans = mariposa.bans.cache.fetch({ force: true })

        if (!(members.has(user.id) || bans.has(user.id))) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('ac94f4')
                    .setAuthor({ name: mariposa.name, iconURL: mariposa.iconURL({ dynamic: true }) })
                    .setTitle('Modmail Utility')
                    .setDescription(`**Apologies!**\n\nThis utility is only available for those who're or were a member of Mariposa.`)
                    .setTimestamp(Date.now())
            ]
        })

        const instructions = `${numbers.one}**.**  You can only create one mail channel.\n${numbers.two}**.**  If you're found to be trolling using this utility, you'll get blacklisted from using it.\n${numbers.three}**.**  The server staff will respond to your mail in due time. Be patient.\n${numbers.four}**.**  Deletion of a text doesn't delete it on the staff's side.`
        const desc = `Welcome to the Modmail Utility of the mimi's server!\n\n${underscore('Kindly read through the instructions given below:')}\n${instructions}` + "\n\nThat's all. Now, send your mail."

        const emb = new EmbedBuilder()
                .setColor('ac94f4')
                .setAuthor({ name: mariposa.name, iconURL: mariposa.iconURL({ dynamic: true }) })
                .setTitle('Modmail Utility')
                .setDescription(desc)
                .setTimestamp(Date.now())

        message.channel.send({
            embeds: [emb]
        })

    }
}