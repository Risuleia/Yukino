const client = require('../index')
const db = require('../db')
const { EmbedBuilder } = require('discord.js')

client.on('messageCreate', async message => {

    const mariposa = client.guilds.cache.find(g => g.id === '879726321155051530')

    if (!message.channel.isDMBased() || message.author.bot) return

    const mails = await db.get('mails')
    if (!mails) return
    if (Object.keys(mails).length < 0) return
    const modmail_id = await db.get('serverconf').modmail
    const modmail = mariposa.channels.cache.find(c => c.id === modmail_id)
    if (!modmail_id || !modmail) return

    const id = message.author.id
	console.log(id, Object.keys(mails))
    if (!(Object.keys(mails).some(key => key === id))) return

    const thread_id = mails[id]?.thread
    const thread = mariposa.channels.cache.find(c => c.id === thread_id)
    if (!thread || !thread_id) return

    try {
        thread.send({
        embeds: [
            new EmbedBuilder()
                .setColor(0xacbdef)
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setDescription((!message.content || message.content == '') ? '_No Text_' : message.content)
                .setImage(message.attachments?.first()?.proxyURL || null)
                .setFooter({ text: message.author.id })
                .setTimestamp(Date.now())
            ]
        })
    } catch (err) {
        throw err
    }
    
})