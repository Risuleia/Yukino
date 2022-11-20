const construct = require("../../Utilities/emb.js")

module.exports = {
    name: "emb",
    aliases: ['emb'],
    description: "test embed command",
    usage: "test",
    execute: async (client, message, args, db) => {

        const chan = message.channel
        
        // regex
        const hex = /^\#?[a-zA-Z0-9]{6}$/g
        const space = / +/g
        const img = /^https:\/{2}.+\/.+\.(png|jpg|jpeg|webp|gif)(\/|(\?\S*))?$/g

        // empty variables
        let color
        let title
        let description
        let image
        let thumbnail
        let timestamp
        
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
            return ((img.test(m.content) || ["skip", "skip", "cancel"].some(word => word === m.content.toLowerCase())) && m.author.id === message.author.id)
        }
        const thumbnail_filter = m => {
            return ((img.test(m.content) || ["skip", "skip", "cancel"].some(word => word === m.content.toLowerCase())) && m.author.id === message.author.id)
        }
        const timestamp_filter = m => {
            return ((['skip', 'cancel', 'yes', 'no', 'true', 'false'].some(word => word === m.content.toLowerCase())) && m.author.id === message.author.id)
        }
        const name_filter = m => {
            return (!space.test(m.content) && m.author.id === message.author.id)
        }

        // color
        chan.awaitMessages({ color_filter, max: 1, time: 60000 })
            .then(color => {
                if (color.content = "cancel") return chan.send("operation cancelled")
                color = color
            })
        // title
        chan.awaitMessages({ title_filter, max: 1 })
            .then(title => {
                if (title.content = "cancel") return chan.send("operation cancelled")
                title = title
            })
        // description
        chan.awaitMessages({ description_filter, max: 1, time: 60000 })
            .then(description => {
                if (description.content = "cancel") return chan.send("operation cancelled")
                description = description
            })
        // image
        chan.awaitMessages({ image_filter, max: 1, time: 60000 })
            .then(image => {
                if (image.content = "cancel") return chan.send("operation cancelled")
                image = image
            })
        // thumbnail
        chan.awaitMessages({ thumbnail_filter, max: 1, time: 60000 })
            .then(thumbnail => {
                if (thumbnail.content = "cancel") return chan.send("operation cancelled")
                thumbnail = thumbnail
            })
        // timestamp
        chan.awaitMessages({ timestamp_filter, max: 1, time: 60000 })
            .then(timestamp => {
                if (timestamp.content = "cancel") return chan.send("operation cancelled")
                timestamp = timestamp
            })

        console.log(construct(color, title, description, image, thumbnail, timestamp))
        

    }
}