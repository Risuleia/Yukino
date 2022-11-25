const translate = require("../../Models/translator")
const construct = require("../emb")
const { create, add } = require("../embed")

const embcreate = async (message) => {
    const chan = message.channel

    // cancel message
    const cancel = () => {
        chan.send({
            embeds: [{
                color: 0xe6d0ce,
                description: "awh, operation cancelled :("
            }]
        })
    }
    
    // regex
    const hex = /^\#?[a-fA-F0-9]{6}$/g
    const space = /\s+/g
    const img = /^https:\/{2}.+\/.+\.(png|jpg|jpeg|webp|gif)(\/|(\?\S*))?$/g

    // empty variables
    let color
    let title
    let description
    let image
    let thumbnail
    let timestamp
    let name
    
    // filters
    const color_filter = m => {
        return ((hex.test(m.content) || ["skip", "random", "cancel"].some(word => word === m.content.toLowerCase())) && m.author.id === message.author.id)
    }
    const title_filter = m => {
        return (m.content.split("").length <= 256 && m.author.id === message.author.id)
    }
    const description_filter = m => {
        return (m.content.split("").length <= 4096 && m.author.id === message.author.id)
    }
    const image_filter = m => {
        return ((img.test(m.content) || ["skip", "skip", "cancel", "{user_avatar}", "{server_icon}"].some(word => word === m.content.toLowerCase())) && m.author.id === message.author.id)
    }
    const thumbnail_filter = m => {
        return ((img.test(m.content) || ["skip", "skip", "cancel", "{user_avatar}", "{server_icon}"].some(word => word === m.content.toLowerCase())) && m.author.id === message.author.id)
    }
    const timestamp_filter = m => {
        return ((['skip', 'cancel', 'yes', 'no'].some(word => word === m.content.toLowerCase())) && m.author.id === message.author.id)
    }
    const name_filter = m => {
        return (!(space.test(m.content)) && m.author.id === message.author.id)
    }

    // responses
    const states = [
        "What should the color of your embed be?\n__Allowed Values:__\n- Hex (example: #000000)\n- \"Random\" (Chooses a random color for your embed)\n- \"Skip\" (Goes with the default color of white.)",
        "What will your embed be about? Send the title! (cannot be omitted)",
        "Next, tell me what your embed will say. Send the description. (cannot be omitted)",
        "Does your embed need an image? If yes, respond with a valid image URL, or use variables like {user_avatar} or {server_icon}. Otherwise, type \"skip\".",
        "Need a thumbnail for your pretty embed? Respond with a valid image URL, or use variables like {user_avatar} or {server_icon}. Type \"skip\" if it doesn't need one.",
        "Almost there!\nTell me if your embed needs a timestamp on it. (Yes/No)",
        "Finally, name your embed! (No Spaces!)"
    ]

    // color
    chan.send(states[0])
    chan.awaitMessages({ filter: color_filter, max: 1, time: 60000 })
        .then(color => {
            if (color.first().content.toLowerCase() === "cancel") return cancel()
            color = (color.first().content.toLowerCase() === "random") ? "RANDOM" : (color.first().content.toLowerCase() === "skip") ? "ffffff" : color.first().content
            // title
            chan.send(states[1])
            chan.awaitMessages({ filter: title_filter, max: 1, time: 60000 })
                .then(title => {
                    if (title.first().content.toLowerCase() === "cancel") return cancel()
                    title = title.first().content

                    // description
                    chan.send(states[2])
                    chan.awaitMessages({ filter: description_filter, max: 1, time: 60000 })
                        .then(description => {
                            if (description.first().content.toLowerCase() === "cancel") return cancel()
                            description = description.first().content

                            // image
                            chan.send(states[3])
                            chan.awaitMessages({ filter: image_filter, max: 1, time: 60000 })
                                .then(image => {
                                    if (image.first().content.toLowerCase() === "cancel") return cancel()
                                    image = (image.first().content.toLowerCase() === "skip") ? null : image.first().content

                                    // thumbnail
                                    chan.send(states[4])
                                    chan.awaitMessages({ filter: thumbnail_filter, max: 1, time: 60000 })
                                        .then(thumbnail => {
                                            if (thumbnail.first().content.toLowerCase() === "cancel") return cancel()
                                            thumbnail = (thumbnail.first().content.toLowerCase() === "skip") ? null : thumbnail.first().content

                                            // timestamp
                                            chan.send(states[5])
                                            chan.awaitMessages({ filter: timestamp_filter, max: 1, time: 60000 })
                                                .then(timestamp => {
                                                    if (timestamp.first().content.toLowerCase() === "cancel") return cancel()
                                                    timestamp = (timestamp.first().content.toLowerCase() === "yes") ? true : false

                                                    // name
                                                    chan.send(states[6])
                                                    chan.awaitMessages({ filter: name_filter, max: 1, time: 60000 })
                                                        .then(async name => {
                                                            name = name.first().content.split(space,1)[0]

                                                            const emb = construct(color, title, description, image, thumbnail, timestamp)
                                                            const translated = {
                                                                color: translate(message.author, message.guild, chan, color),
                                                                title: translate(message.author, message.guild, chan, title),
                                                                description: translate(message.author, message.guild, chan, description),
                                                                image: emb.image ? translate(message.author, message.guild, chan, image) : emb.image,
                                                                thumbnail: emb.thumbnail ? translate(message.author, message.guild, chan, thumbnail) : emb.thumbnail,
                                                                timestamp: emb.timestamp ? translate(message.author, message.guild, chan, timestamp) : emb.timestamp
                                                            }
                                                            add(message, emb, name)
                                                            create(chan, translated)
                                                            
                                                })
                                        })
                                })
                        })
                })
        })

    }
)}

module.exports = embcreate