const { create } = require('./embed')
const translate = require('../Models/translator')
const db = require('../db')

const sendwelc = async (author, chan) => {

	if (!chan || !author) return

	const embeds = await db.get('embeds')
	const conf = await db.get('serverconf')

	let welcemb = conf.welcome_emb
	if (!welcemb) return
	
	let emb = embeds.find(e => e.name === welcemb)
	if (!emb) return
	let translated = {
		color: translate(author, author.guild, chan, emb.embed.color),
		title: emb.embed.title ? translate(author, author.guild, chan, emb.embed.title) : emb.embed.title,
		description: translate(author, author.guild, chan, emb.embed.description),
		image: emb.embed.image ? translate(author, author.guild, chan, emb.embed.image) : emb.embed.image,
		thumbnail: emb.embed.thumbnail ? translate(author, author.guild, chan, emb.embed.thumbnail) : emb.embed.thumbnail,
		timestamp: emb.embed.timestamp
	}

	create(chan, translated, author, 'welc')
	
}

module.exports = sendwelc