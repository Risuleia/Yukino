const db = require("../../db")
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

    const emb = embeds.find(emb => emb.name === arg)

    create(chan, emb.embed)

}

module.exports = embsend