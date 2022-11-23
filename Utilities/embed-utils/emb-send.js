const db = require("../../db")
const translate = require("../../Models/translator")
const { create } = require("../embed")

const embsend = async (message, args) => {

    const embeds = await db.get('embeds')
    const arg = args[1] || null
    const chan = await message.mentions?.channels?.first() || message.channel

    if (!embeds || !embeds.length || embeds.length == 0) return message.channel.send({
        content: "you dont have any embeds yet... create some pretty embeds, luv!",
        reply: { messageReference: message.id }
    })

    if (!arg) return message.channel.send({
        content: "specify an embed you want me show",
        reply: { messageReference: message.id }
    })

    if (!embeds.some(emb => emb.name === arg)) return message.channel.send({
        content: "no such embed exists... yet",
        reply: { messageReference: message.id }
    })

    const emb = embeds.find(emb => emb.name === arg)?.embed

    const translated = {
        color: await translate(message.author, message.guild, chan, emb.color),
        title: await translate(message.author, message.guild, chan, emb.title),
        description: await translate(message.author, message.guild, chan, emb.description),
        image: emb.image ? await translate(message.author, message.guild, chan, emb.image) : emb.image,
        thumbnail: emb.thumbnail ? await translate(message.author, message.guild, chan, emb.thumbnail) : emb.thumbnail,
        timestamp: emb.timestamp ? await translate(message.author, message.guild, chan, emb.timestamp) : emb.timestamp
    }
    // console.log(translated)
    await create(chan, translated)

}

module.exports = embsend