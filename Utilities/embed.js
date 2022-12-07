const { MessageEmbed } = require('discord.js')
const db = require('../db')
const check = require('./check')

const create = async (channel, emb, author = null, content = false) => {

	if (!emb) return
	if (!emb.title || !emb.description) return

	let color = emb.color
	let title = emb.title
	let description = emb.description
	let image = emb.image
	let thumbnail = emb.thumbnail
	let timestamp = emb.timestamp

	const embed = new MessageEmbed()
			.setColor(color)
			.setTitle(title)
			.setDescription(description)
			.setImage(image ? image : null)
			.setThumbnail(thumbnail ? thumbnail : null)
			.setTimestamp(!timestamp ? null : Date.now())

	if (author) embed.setAuthor({
		name: `${author.user.username}#${author.user.discriminator}`,
		iconURL: await author.displayAvatarURL({ dynamic: true })
	})

	if (content && author) return channel.send({
		content: `**Hiii! ${author.toString()}**`,
		embeds: [embed]
	})
		
	channel.send({
		embeds: [embed]
	})

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
	// db.push('embeds', newEmb)

	message.channel.send(`${message.author.toString()}, i've succesfully added your embed :)`)
	
}

const remove = async (message, name) => {

	if (!name) return message.channel.send({
		content: "pls specify the name of the embed you want to delete... might as well reconsider if you did this by mistake :/",
		reply: { messageReference: message.id }
	})

	const embeds = await db.get('embeds')

	if (!embeds || !embeds.length || embeds.length == 0) return message.channel.send({
		content: "you dont have any embeds... create some pretty embeds!",
		reply: { messageReference: message.id } 
	})
	if (!embeds.some(emb => emb.name == name)) return message.channel.send({
		content: "that embed doesnt exist!",
		reply: { messageReference: message.id }
	})

	// remove embed
	const newEmbeds = embeds.filter(emb => emb.name !== name)
	db.set('embeds', newEmbeds)

	message.channel.send(`${message.author.toString()}, i've succesfully removed that embed`)

	check()
	
}

const edit = async (message, emb, prop, val) => {
	
	const chan = message.channel
	const embeds = await db.get('embeds')
	const id = embeds.findIndex(e => e.name === emb.name)
	const selected = embeds[id]
	
	if (prop === "color") {
		emb.embed.color = val
		create(chan, emb.embed)
		chan.send(`${message.author.toString()}, i've succesfully edited that embed :)`)
	}
	if (prop === "title") {
		emb.embed.title = val
		create(chan, emb.embed)
		chan.send(`${message.author.toString()}, i've succesfully edited that embed :)`)
	}
	if (prop === "description") {
		emb.embed.description = val
		create(chan, emb.embed)
		chan.send(`${message.author.toString()}, i've succesfully edited that embed :)`)
	}
	if (prop === "image") {
		emb.embed.image = val
		create(chan, emb.embed)
		chan.send(`${message.author.toString()}, i've succesfully edited that embed :)`)
	}
	if (prop === "thumbnail") {
		emb.embed.thumbnail = val
		create(chan, emb.embed)
		chan.send(`${message.author.toString()}, i've succesfully edited that embed :)`)
	}
	if (prop === "timestamp") {
		emb.embed.timestamp = val
		create(chan, emb.embed)
		chan.send(`${message.author.toString()}, i've succesfully edited that embed :)`)
	}

	const newEmb = {
		name: selected.name,
		embed: emb.embed
	}
	embeds.splice(id, 1, newEmb)
	db.set('embeds', embeds)
	
}

module.exports = {
	create: create,
	add: add,
	remove: remove,
	edit: edit
}