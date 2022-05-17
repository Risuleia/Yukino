const { create, add, remove } = require("../../Utilities/embed")
const { checkImg } = require("../../Utilities/helper")
const Database = require("@replit/database")
const db = new Database()

module.exports = {
	name: "embed",
	aliases: ['emb'],
	description: "Stores, removes, shows or sends an embed.",
	usage: "<add/remove/send/show/list> <embed name (if used with `send` or `show` subcmd) <channel mention (if used with `send` subcmd)>",
	execute: async (client, message, args, db) => {

		const allowedParams = ['add', 'create', '+', 'remove', 'delete', '-', 'send', 'show', 'list']

		const param = args[0]?.toLowerCase()

		if (!(allowedParams.some(allowedParam => allowedParam === param))) return message.channel.send({
			content: "that's not a valid parameter, see the help for this command :)",
			reply: { messageReference: message.id }
		})


		//  subcmds
		if (["add", "create", "+"].some(p => p === param)) {

			// states
			const states = [
				"What should the color of your embed be?\n__Allowed Values:__\n- Hex (example: #000000)\n- \"Random\" (Chooses a random color for your embed)\n- \"Skip\" (Goes with the default color of white.)",
				"What will your embed be about? Send the title! (cannot be omitted)",
				"Next, tell me what your embed will say. Send the description. (cannot be omitted)",
				"Does your embed need an image? If yes, respond with a valid image URL. Otherwise, type \"skip\".",
				"Need a thumbnail for your pretty embed? Respond with a valid image URL. Type \"skip\" if it doesn't need one.",
				"Almost there!\nTell me if your embed needs a timestamp on it. (Yes/True or No/False)",
				"Finally, name your embed!"
			]
			
			// embed object
			const emb = {
				color: "ffffff",
				title: "Title here",
				description: "Description here",
				thumbnail: null,
				image: null,
				timestamp: null
			}

			// regex
			const hex = /^\#?[a-zA-Z0-9]{6}$/g
			const space = / +/g
			const img = /^https:\/{2}.+\/.+\.(png|jpg|jpeg|webp|gif)(\/|(\?\S*))$/g

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
				return ((["skip", "cancel"].some(word => word === m.content.toLowerCase()) || img.test(m.content)) && m.author.id === message.author.id)
			}
			const timestamp_filter = m => {
				return ((['skip', 'cancel', 'yes', 'no', 'true', 'false'].some(word => word === m.content.toLowerCase())) && m.author.id === message.author.id)
			}
			const name_filter = m => {
				return (!space.test(m.content) && m.author.id === message.author.id)
			}
			
			let stateMsg
			let embMsg

			message.channel.send({
				embeds: [create(emb.color, emb.title, emb.description, emb.image, emb.thumbnail, emb.timestamp)]
			}).then(m => embMsg = m)
			message.channel.send(states[0]).then(m => stateMsg = m)
			
			// color
			const color_collector = message.channel.createMessageCollector({
				filter: color_filter,
				max: 1,
				time: 20000
			})

			color_collector.on('collect', async color => {
				if (color.content.toLowerCase() === "cancel") return message.channel.send({
					embeds: [{
						color: 0xe6d0ce,
			description: "awh, operation cancelled :("
					}]
				})
				if (color.content.toLowerCase() === "skip") emb.color = "ffffff"
				if (color.content.toLowerCase() === "random") emb.color = "RANDOM"
				else emb.color = color.content.replace("#","")
				color.delete()
				embMsg.edit({
					embeds: [create(emb.color, emb.title, emb.description, emb.image, emb.thumbnail, emb.timestamp)]
				})
				stateMsg.edit({
					content: states[1]
				})
				
				// title
				const title_collector = message.channel.createMessageCollector({
					title_filter,
					max: 1,
					time: 30000
				})
	
				title_collector.on('collect', async title => {
					if (title.content.toLowerCase() === "cancel") return message.channel.send({
						embeds: [{
					color: 0xe6d0ce,
			description: "awh, operation cancelled :("
						}]
					})
					emb.title = title.content
					title.delete()
					embMsg.edit({
						embeds: [create(emb.color, emb.title, emb.description, emb.image, emb.thumbnail, emb.timestamp)]
					})
					stateMsg.edit({
						content: states[2]
					})

				// description
					const description_collector = message.channel.createMessageCollector({
						filter: description_filter,
						max: 1,
						time: 20000
					})
		
					description_collector.on('collect', async description => {
						if (description.content.toLowerCase() === "cancel") return message.channel.send({
								embeds: [{
									color: 0xe6d0ce,
									description: "awh, operation cancelled :("
								}]
						})
						emb.description = description.content
						description.delete()
						embMsg.edit({
							embeds: [create(emb.color, emb.title, emb.description, emb.image, emb.thumbnail, emb.timestamp)]
						})
						stateMsg.edit({
							content: states[3]
						})

						// image
						const image_collector = message.channel.createMessageCollector({
							filter: image_filter,
							max: 1,
							time: 20000
						})
			
						image_collector.on('collect', async image => {
							if (image.content.toLowerCase() === "cancel") return message.channel.send({
								embeds: [{
									color: 0xe6d0ce,
									description: "awh, operation cancelled :("
								}]
							})
							if (image.content.toLowerCase() == "skip") emb.image = null
							else emb.image = image.content
							image.delete()
							embMsg.edit({
								embeds: [create(emb.color, emb.title, emb.description, emb.image, emb.thumbnail, emb.timestamp)]
							})
							stateMsg.edit({
								content: states[4]
							})

						// thumbnail
							const thumbnail_collector = message.channel.createMessageCollector({
								filter: image_filter,
								max: 1,
								time: 20000
							})
				
							thumbnail_collector.on('collect', async thumbnail => {
								if (thumbnail.content.toLowerCase() === "cancel") return message.channel.send({
									embeds: [{
										color: 0xe6d0ce,
										description: "awh, operation cancelled :("
									}]
								})
								if (thumbnail.content.toLowerCase() === "skip") emb.thumbnail = null
								else emb.thumbnail = thumbnail.content
								thumbnail.delete()
								embMsg.edit({
									embeds: [create(emb.color, emb.title, emb.description, emb.image, emb.thumbnail, emb.timestamp)]
								})
								stateMsg.edit({
									content: states[5]
								})

								// timestamp
								const timestamp_collector = message.channel.createMessageCollector({
									filter: timestamp_filter,
									max: 1,
									time: 20000
								})
					
								timestamp_collector.on('collect', async timestamp => {
									if (timestamp.content.toLowerCase() === "cancel") return message.channel.send({
										embeds: [{
											color: 0xe6d0ce,
											description: "awh, operation cancelled :("
										}]
									})
									if (["skip", "no", "false"].some(word => word === timestamp.content)) emb.timestamp = null
									else emb.timestamp = true
									timestamp.delete()
									embMsg.edit({
										embeds: [create(emb.color, emb.title, emb.description, emb.image, emb.thumbnail, emb.timestamp)]
									})
									stateMsg.edit({
										content: states[6]
									})

									// name
									const name_collector = message.channel.createMessageCollector({
										filter: name_filter,
										max: 1,
										time: 20000
									})
					
									name_collector.on('collect', async name => {
										if (name.content.toLowerCase() === "cancel") return message.channel.send({
											embeds: [{
												color: 0xe6d0ce,
												description: "awh, operation cancelled :("
											}]
										})
										name.delete()
										embMsg.delete()
										stateMsg.delete()
										add(message, create(emb.color, emb.title, emb.description, emb.image, emb.thumbnail, emb.timestamp), name.content)
									})
								})
							})
						})
					})
				})
			})
			
		}

		if (["remove", "delete", "-"].some(p => p === param)) {
			remove(message, args[1])
		}

		if (param === "send") {

			const embeds = await db.get('embeds')
			const arg = args[1]?.toLowerCase() || null
			const chan = message.mentions?.channels?.first()

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

			if (!chan) return message.channel.send({
				content: "try again but this time, ping the channel where you want me to send that embed, bb",
				reply: { messageReference: message.id }
			})

			const emb = embeds.find(emb => emb.name === arg)

			chan.send({
				embeds: [emb.embed]
			})
			
		}

		if (param === "show") {

			const embeds = await db.get('embeds')
			const arg = args[1] || null

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

			message.channel.send({
				embeds: [emb.embed]
			})
			
		}
		
		if (param === "list") {

			const embeds = await db.get('embeds')

			message.channel.send({
				embeds: [{
					color: 0xe6d0ce,
					title: "here are all the embeds:",
					description: (!embeds || !embeds.length || embeds.length == 0) ? "you dont have any embeds yet... create some pretty embeds, luv!" : embeds.map(emb => emb.name).join("\n"),
					footer: {
						text: "Yukino <3"
					}
				}],
				reply: { messageReference: message.id },
				allowedMentions: { repliedUser: false }
			})
			
		}
		
	}
}