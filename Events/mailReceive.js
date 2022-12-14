const client = require('../index')
const db = require('../db')
const { EmbedBuilder } = require('discord.js')

client.on('messageCreate', async message => {

    const mariposa = client.guilds.cache.find(g => g.id === '879726321155051530')

    if (message.channel.isDMBased() || !message.channel.isThread() || message.author.bot ) return

    const mails = await db.get('mails')
    if (!mails) return
    if (Object.keys(mails).length < 0) return

    const modmail_id = await db.get('serverconf').modmail
    const modmail = mariposa.channels.cache.find(c => c.id === modmail_id)
    if (!modmail_id || !modmail) return

    const id = Object.keys(mails).find(a => mails[a].thread === message.channel.id)
    if (!id) return
    const user = client.users.fetch(id) || null
    if (!user) return
    const chan = await client.channels.fetch(mails[id].dm)

    try {
        chan.send({
        embeds: [
            new EmbedBuilder()
                .setColor(0xacbdef)
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setDescription((!message.content || message.content == '') ? '_No Text_' : message.content)
                .setImage(message.attachments?.first()?.proxyURL || null)
                .setFooter({ text: mariposa.name, iconURL: mariposa.iconURL({ dynamic: true }) })
                .setTimestamp(Date.now())
            ]
        })
    } catch (err) {
        throw err
    }
    
})