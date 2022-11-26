const db = require('../../db')
const { edit } = require("../embed")

const embedit = async (message, args) => {

    let chan = message.channel

    // states
    const states = [
        "What should the color of your embed be changed to?\n__Allowed Values:__\n- Hex (example: #000000)\n- \"Random\" (Chooses a random color for your embed)\n- A variable like \`{user_displaycolor}\`\n- \"Default\" (Goes with the default color of white.)\n- \"Cancel\" (Cancelles the operation)",
        "What will your embed be about? Send the new title! (cannot be removed)",
        "Next, tell me what your embed will say. Send the new description. (cannot be removed)",
        "What changes do you want to make to the image of your embed?\n__Allowed Values:__\n- A valid image URL\n- Variables like \`{user_avatar}\` or \`{server_icon}\`\n- \"Remove\" (Removes the current image)\n- \"Cancel\" (Cancelles the operation)",
        "What changes do you want to make to the thumbnail of your embed?\n__Allowed Values:__\n- A valid image URL\n- Variables like \`{user_avatar}\` or \`{server_icon}\`\n- \"Remove\" (Removes the current thumbnail)\n- \"Cancel\" (Cancelles the operation)",
        "Should your embed have a timestamp?\n__Allowed Values:__\n- \"Yes\" (Adds the timestamp)\n- \"No\" (Remove the timestamp)\n- \"Cancel\" (Cancelles the operation)",
        "Are you happy with your changes? \"Yes\" if your are, and \"No\" if you aren't."
    ]

    // regex
    const hex = /^\#?[a-fA-F0-9]{6}$/g
    const img = /^https:\/{2}.+\/.+\.(png|jpg|jpeg|webp|gif)(\/|(\?\S*))?$/g

    // filters
    const color_filter = m => {
        return ((hex.test(m.content) || ["{user_displaycolor}", "default", "random", "cancel"].some(word => word === m.content.toLowerCase())) && m.author.id === message.author.id && m.content !== emb.embed.color)
    }
    const title_filter = m => {
        return (m.content.split("").length <= 256 && m.author.id === message.author.id && m.content !== emb.embed.color)
    }
    const description_filter = m => {
        return (m.content.split("").length <= 4096 && m.author.id === message.author.id)
    }
    const image_filter = m => {
        return ((img.test(m.content) || ["{user_avatar}", "{server_icon}", "remove", "cancel"].some(word => word === m.content.toLowerCase())) && m.author.id === message.author.id)
    }
    const thumbnail_filter = m => {
        return ((img.test(m.content) || ["{user_avatar}", "{server_icon}", "remove", "cancel"].some(word => word === m.content.toLowerCase())) && m.author.id === message.author.id)
    }
    const timestamp_filter = m => {
        return ((['cancel', 'yes', 'no', 'true', 'false'].some(word => word === m.content.toLowerCase())) && m.author.id === message.author.id)
    }
    const confirmation_filter = m => {
        return (["yes", "no"].some(word => word === m.content.toLowerCase()) && m.author.id === message.author.id)
    }
        
    const filters = [color_filter, title_filter, description_filter, image_filter, thumbnail_filter, timestamp_filter, confirmation_filter]

    // properties
    const props = ['color', 'title', 'description', 'image', 'thumbnail', 'timestamp']
    
    const embeds = await db.get('embeds')
    if (!embeds || !embeds.length || embeds.length == 0) return message.channel.send({
        content: "you dont have any embeds yet... create some pretty embeds!",
        reply: { messageReference: message.id }
    })

    if (!args[1]) return message.channel.send({
        content: "you need to specify the embed you want to edit!",
        reply: { messageReference: message.id }
    })
    
    const emb = embeds.find(emb => emb.name === args[1])
    if (!emb) return message.channel.send({
        content: "that embed doesnt exist...",
        reply: { messageReference: message.id }
    })

    if (!args[2]) return message.channe.send({
        content: "you need to specify a property you want to change"
    })

    if (!props.some(prop => prop === args[2]?.toLowerCase())) return message.channel.send({
        content: "not a valid property to change!",
        reply: { messageReference: message.id }
        })


    const id = props.findIndex(prop => prop === args[2]?.toLowerCase())
    const prop = props[id]
    const state = states[id]
    const filter = filters[id]

    let embMsg
    let stateMsg
    let val

    message.channel.send({
        embeds: [{
            color: emb.embed.color,
            title: emb.embed.title,
            description: emb.embed.description,
            image: { url: emb.embed.image },
            thumbnail: { url: emb.embed.thumbnail },
            timestamp: emb.embed.timestamp ? Date.now() : null
        }]
    }).then(m => embMsg = m)
    message.channel.send(state).then(m => stateMsg = m)

    chan.awaitMessages({ filter, max: 1, time: 60000 })
        .then(async msg => {

            let resp = msg.first().content

            if (resp?.toLowerCase() === "cancel") return chan.send({
                embeds: [{
                    color: 0xe6d0ce,
                    description: "operation cancelled"
                }]
            })

            if (id === 0) {
                if (resp?.toLowerCase() === "random") val = "RANDOM"
                if (resp?.toLowerCase() === "default") val = "ffffff"
                else val = resp?.replace("#", "")
                msg.delete()
                embMsg.edit({
                    embeds: [{
                        color: val,
                        title: emb.embed.title,
                        description: emb.embed.description,
                        image: { url: emb.embed.image },
                        thumbnail: { url: emb.embed.thumbnail },
                        timestamp: emb.embed.timestamp ? Date.now() : null
                    }]
                })
                stateMsg.edit(states[6])
            }
            if (id === 1 || id === 2) {
                val = resp
                msg.delete()
                embMsg.edit({
                    embeds: [{
                        color: emb.embed.color,
                        title: id === 1 ? val : emb.embed.title,
                        description: id === 2 ? val : emb.embed.description,
                        image: { url: emb.embed.image },
                        thumbnail: { url: emb.embed.thumbnail },
                        timestamp: emb.embed.timestamp ? Date.now() : null
                    }]
                })
                stateMsg.edit(states[6])
            }
            if (id === 3 || id === 4) {
                if (resp?.toLowerCase() === "remove") val = null
                else val = resp
                msg.delete()
                embMsg.edit({
                    embeds: [{
                        color: emb.embed.color,
                        title: emb.embed.title,
                        description: emb.embed.description,
                        image: { url: id === 3 ? val : emb.embed.image },
                        thumbnail: { url: id === 4 ? val : emb.embed.thumbnail },
                        timestamp: emb.embed.timestamp ? Date.now() : null
                    }]
                })
                stateMsg.edit(states[6])
            }
            if (id === 5) {
                if (resp?.toLowerCase() === "yes") val = true
                else val = false
                msg.delete()
                embMsg.edit({
                    embeds: [{
                        color: emb.embed.color,
                        title: id === 1 ? val : emb.embed.title,
                        description: id === 2 ? val : emb.embed.description,
                        image: { url: emb.embed.image },
                        thumbnail: { url: emb.embed.thumbnail },
                        timestamp: val ? Date.now() : null
                    }]
                })
                stateMsg.edit(states[6])
            }

            chan.awaitMessages({ filter: confirmation_filter, max: 1, time: 30000 })
                .then(m => {
                    const confirmation = m.first().content
                    if (confirmation.toLowerCase() === 'no') return message.channel.send({
						embeds: [{
							color: 0xe6d0ce,
							description: "seems you reconsidered"
						}]
					})
					else {
						m.delete()
                        msg.delete()
						stateMsg.delete()
						embMsg.delete()
						edit(message, emb, prop, val)
					}
                })

        })

}

module.exports = embedit