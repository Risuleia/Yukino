const { EmbedBuilder, ThreadAutoArchiveDuration, underscore } = require('discord.js')
const db = require('../db')
const client = require('../index')
const trim = require('../Models/trim')
const { numbers } = require('./emotes')


const addmail = async (message, user) => {

    const mariposa = client.guilds.cache.find(g => g.id === '879726321155051530')

    if (!user || !message) return

    const chan = message.channel
    const id = user.id
    const mails = await db.get('mails')
    const conf = await db.get('serverconf')
    const modmail_id = conf.modmail
    const modmail = mariposa.channels.cache.find(c => c.id === modmail_id)
    const keys = mails ? Object.keys(mails) : []

    const yes_emoji = '1020432707441926304'
    const no_emoji = '944692244630347827'

    if (!modmail_id || !modmail) return

    if (keys.length > 0 && keys?.some(key => key === id)) {
        message.react(no_emoji)
        chan.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('#e6d0ce')
                    .setAuthor({ name: mariposa.name, iconURL: mariposa.iconURL({ dynamic: true }) })
                    .setTitle('Modmail Utility')
                    .setDescription('You already have a mail channel linked with the staff!')
                    .setTimestamp(Date.now())
                ]
        })
    }

    try {
        let mailchan

        modmail.threads.create({
            name: trim(user.username, 25),
            autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek
        }).then(threadChannel => {
            mailchan = threadChannel.id

            mails[id] = {}
            mails[id].thread = mailchan
            mails[id].dm = chan.id
            db.set('mails', mails)
        })

    } catch (err) {
        throw err
    }

    message.react(yes_emoji)
    const instructions = `${numbers.one}**.**  You can only create one mail channel.\n${numbers.two}**.**  If you're found to be trolling using this utility, you'll get blacklisted from using it.\n${numbers.three}**.**  The server staff will respond to your mail in due time. Be patient.\n${numbers.four}**.**  Deletion of a text doesn't delete it on the staff's side.`
    const desc = `Welcome to the Modmail Utility of the mimi's server!\n\n${underscore('Kindly read through the instructions given below:')}\n${instructions}` + "\n\nThat's all."

    const emb = new EmbedBuilder()
            .setColor('ac94f4')
            .setAuthor({ name: mariposa.name, iconURL: mariposa.iconURL({ dynamic: true }) })
            .setTitle('Modmail Utility')
            .setDescription(desc)
            .setTimestamp(Date.now())

    chan.send({
        embeds: [emb]
    })

}

const closemail = async (message, id) => {

    const mariposa = client.guilds.cache.find(g => g.id === '879726321155051530')

    if (!message || !id) return
    if (message.channel.isDMBased()) return

    const mails = await db.get('mails')
    const modmail_id = await db.get('serverconf').modmail
    const modmail = mariposa.channels.cache.find(c => c.id === modmail_id)

    if (!modmail_id || !modmail) return

    const keys = mails ? Object.keys(mails) : []

    if (!(keys?.some(key => key === id))) return message.reply({
        embeds: [
            new EmbedBuilder()
                .setColor('#e6d0ce')
                .setAuthor({ name: mariposa.name, iconURL: mariposa.iconURL({ dynamic: true }) })
                .setTitle('Modmail Utility')
                .setDescription('There\'s so no mail linked to this user.')
                .setTimestamp(Date.now())
        ]
    })

    const thread_id = mails[id].thread
    const thread = await modmail.threads.fetch(thread_id)

    try {
        delete mails[id]
        db.set('mails', mails)
        thread.delete()
    } catch (err) {
        throw err
    }

}

module.exports = {
    addmail: addmail,
    closemail: closemail
}