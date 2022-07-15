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

	if (!embeds || !embeds.length || embeds.length == 0) return message.channel.send({
		content: "you dont have any embeds... create some pretty embeds!",
		reply: { messageReference: message.id } 
	})
	if (!embeds.some(emb => emb.name == embName)) return message.channel.send({
		content: "that embed doesnt exist!",
		reply: { messageReference: message.id }
	})

	// remove embed
	const newEmbeds = embeds.filter(emb => emb.name !== embName)
	db.set('embeds', newEmbeds)

	message.channel.send(`${message.author.toString()}, i've succesfully removed that embed`)
	
}

const edit = async (message, emb, prop, val) => {
	
	if (prop === "color") {
		emb.embed.setColor(val)
		message.channel.send({
			embeds: [emb.embed]
		})
		.then(m => m.channel.send(`${m.author.toString()}, i've succesfully edited that embed :)`))
	}
	if (prop === "title") {
		emb.embed.setTitle(val)
		message.channel.send({
			embeds: [emb.embed]
		})
		.then(m => m.channel.send(`${m.author.toString()}, i've succesfully edited that embed :)`))
	}
	if (prop === "description") {
		emb.embed.setDescription(val)
		message.channel.send({
			embeds: [emb.embed]
		})
		.then(m => m.channel.send(`${m.author.toString()}, i've succesfully edited that embed :)`))
	}
	if (prop === "image") {
		emb.embed.setImage(val)
		message.channel.send({
			embeds: [emb.embed]
		})
		.then(m => m.channel.send(`${m.author.toString()}, i've succesfully edited that embed :)`))
	}
	if (prop === "thumbnail") {
		emb.embed.setThumbnail(val)
		message.channel.send({
			embeds: [emb.embed]
		})
	}
	if (prop === "timestamp") {
		emb.embed.setTimestamp(val)
		message.channel.send({
			embeds: [emb.embed]
		})
		.then(m => m.channel.send(`${m.author.toString()}, i've succesfully edited that embed :)`))
	}
		
}

module.exports = {
	create: create,
	add: add,
	remove: remove,
	edit: edit
}