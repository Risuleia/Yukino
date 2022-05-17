const { MessageEmbed } = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

const create = (color = "ffffff", title = "Title here", description = "Description here", image = null, thumbnail = null, timestamp = null) => {

	if (!title || !description) return

	const embed = new MessageEmbed()
				.setColor(color)
				.setTitle(title)
				.setDescription(description)
				.setImage(image ? image : null)
				.setThumbnail(thumbnail ? thumbnail : null)
				.setTimestamp(timestamp ? Date.now() : timestamp)

	return embed

}

const add = async (message, embed, name) => {

	if (!embed || !name) return
	
	const embeds = await db.get('embeds') || []
	const newEmb = {}
	newEmb.embed = embed
	newEmb.name = name

	// add embed
	embeds.push(newEmb)
	db.set('embeds', embeds)

	message.channel.send(`${message.author.toString()}, i've succesfully added your embed :)`)
	
}

const remove = async (message, name) => {

	if (!name) return message.channel.send({
		content: "pls specify the name of the embed you want to delete... might as well reconsider if you did this by mistake :/",
		reply: { messageReference: message.id }
	})
	const embName = name.toLowerCase()

	const embeds = await db.get('embeds')

	if (!embeds || !embed.length || embed.length == 0) return message.channel.send({
		content: "you dont have any embeds... create some pretty embeds!",
		reply: { messageReference: message.id } 
	})
	if (!embeds.some(emb => emb.name == embName)) return message.channel.send({
		content: "that embed doesnt exist!",
		reply: { messageReference: message.id }
	})

	// remove embed
	const emb = embeds.findIndex(emb => emb.name === embName)
	embeds.remove(emb)
	db.set('embeds', embeds)

	message.channel.send(`${message.author.toString()}, i've succesfully removed that embed`)
	
}

module.exports = {
	create: create,
	add: add,
	remove: remove
}