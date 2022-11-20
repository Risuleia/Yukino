const { create, add, remove, edit } = require("../../Utilities/embed")
const Database = require('@replit/database')
const db = new Database()

module.exports = {
	name: "embed",
	aliases: [],
	description: "Stores, removes, edits, shows or sends an embed.",
	usage: "<add/edit/remove/send/show/list> <embed name (if used with `send`, `show`, `remove` or `edit` subcmd) <channel mention (if used with `send` subcmd)|property to edit (if used with `edit` subcmd)>",
	execute: async (client, message, args, db) => {

		const allowedParams = ['add', 'create', '+', 'remove', 'delete', '-', 'edit', '+=', 'send', 'show', 'list']

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
			const img = /^https:\/{2}.+\/.+\.(png|jpg|jpeg|webp|gif)(\/|(\?\S*))?$/g

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
						time: 30000
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
							time: 40000
						})
			
						image_collector.on('collect', async image => {
							if (image.content.toLowerCase() === "cancel") return message.channel.send({
								embeds: [{
									color: 0xe6d0ce,
									description: "awh, operation cancelled :("
								}]
							})
							if (image.content.toLowerCase() == "skip") emb.image = null
							else emb.image = image.content.replace(/\s*?/g, "")
							image.delete()
							embMsg.edit({
								embeds: [create(emb.color, emb.title, emb.description, emb.image, emb.thumbnail, emb.timestamp)]
							})
							stateMsg.edit({
								content: states[4]
							})

						// thumbnail
							const thumbnail_collector = message.channel.createMessageCollector({
								filter: thumbnail_filter,
								max: 1,
								time: 40000
							})
				
							thumbnail_collector.on('collect', async thumbnail => {
								if (thumbnail.content.toLowerCase() === "cancel") return message.channel.send({
									embeds: [{
										color: 0xe6d0ce,
										description: "awh, operation cancelled :("
									}]
								})
								if (thumbnail.content.toLowerCase() === "skip") emb.thumbnail = null
								else emb.thumbnail = thumbnail.content.replace(/\s*?/g, "")
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

		if (["edit", "+="].some(p => p === param)) {

			// states
			const states = [
				"What should the color of your embed be changed to?\n__Allowed Values:__\n- Hex (example: #000000)\n- \"Random\" (Chooses a random color for your embed)\n- \"Default\" (Goes with the default color of white.)\n- \"Cancel\" (Cancelles the operation)",
				"What will your embed be about? Send the new title! (cannot be removed)",
				"Next, tell me what your embed will say. Send the new description. (cannot be removed)",
				"What changes do you want to make to the image of your embed?\n__Allowed Values:__\n- A valid iamge URL\n- \"Remove\" (Removes the current image)\n- \"Cancel\" (Cancelles the operation)",
				"What changes do you want to make to the thumbnail of your embed?\n__Allowed Values:__\n- A valid iamge URL\n- \"Remove\" (Removes the current thumbnail)\n- \"Cancel\" (Cancelles the operation)",
				"Does your embed's timestamp need to be changed?.\n__Allowed Values:__\n- \"Yes\"\\\"True\" (Adds the timestamp)\n- \"No\"\\\"False\" (Remove the timestamp)\n- \"Cancel\" (Cancelles the operation)",
				"Are you happy with your changes? \"Yes\" if your are, and \"No\" if you aren't."
			]

			// regex
			const hex = /^\#?[a-zA-Z0-9]{6}$/g
			const img = /^https:\/{2}.+\/.+\.(png|jpg|jpeg|webp|gif)(\/|(\?\S*))?$/g

			// filters
			const color_filter = m => {
				return ((hex.test(m.content) || ["default", "random", "cancel"].some(word => word === m.content.toLowerCase())) && m.author.id === message.author.id && m.content !== emb.embed.color)
			}
			const title_filter = m => {
				return (m.content.split("").length <= 256 && m.author.id === message.author.id && m.content !== emb.embed.color)
			}
			const description_filter = m => {
				return (m.content.split("").length <= 4096 && m.author.id === message.author.id)
			}
			const image_filter = m => {
				return ((img.test(m.content) || ["remove", "cancel"].some(word => word === m.content.toLowerCase())) && m.author.id === message.author.id)
			}
			const thumbnail_filter = m => {
				return ((img.test(m.content) || ["remove", "cancel"].some(word => word === m.content.toLowerCase())) && m.author.id === message.author.id)
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
			
			const emb = embeds.find(emb => emb.name === args[1]?.toLowerCase())
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
				embeds: [emb.embed]
			}).then(m => embMsg = m)
			message.channel.send(state).then(m => stateMsg = m)
			
			const edit = message.channel.createMessageCollector({
				filter,
				max: 1,
				time: 40000
			})

			edit.on('collect', async m => {

				if (m.content.toLowerCase() === "cancel") return

				if (id === 0) {
					if (m.content.toLowerCase() === "random") val = "RANDOM"
					if (m.content.toLowerCase() === "default") val = "ffffff"
					else val = m.content.replace("#", "")
					m.delete()
					embMsg.edit({
						embeds: [create(val, emb.embed.title, emb.embed.description, emb.embed.image.url, emb.embed.thumbnail.url, emb.embed.timestamp)]
					})
					stateMsg.edit(states[6])
				}
				if (id === 1 || id === 2) {
					val = m.content
					m.delete()
					embMsg.edit({
						embeds: [create(emb.embed.color, id === 1 ? val : emb.embed.title, id === 2 ? val : emb.embed.description, emb.embed.image.url, emb.embed.thumbnail.url, emb.embed.timestamp)]
					})
					stateMsg.edit(states[6])
				}
				if (id === 3 || id === 4) {
					if (m.content.toLowerCase() === "remove") val = null
					else val = m.content
					m.delete()
					embMsg.edit({
						embeds: [create(emb.embed.color, emb.embed.title, emb.embed.description, id === 3 ? val : emb.embed.image.url, id === 4 ? val : emb.embed.thumbnail.url, emb.embed.timestamp)]
					})
					stateMsg.edit(states[6])
				}
				if (id === 5) {
					if (["yes", "true"].some(arg => arg === m.content.toLowerCase())) val = Date.now()
					else val = null
					m.delete()
					embMsg.edit({
						embeds: [create(emb.embed.color, emb.embed.title, emb.embed.description, emb.embed.image.url, emb.embed.thumbnail.url, val)]
					})
					stateMsg.edit(states[6])
				}
				
				const confirmation = message.channel.createMessageCollector({
					filter: confirmation_filter,
					max: 1,
					time: 30000
				})

				confirmation.on('collect', async m => {
					if (m.content.toLowerCase() === 'no') return message.channel.send({
						embeds: [{
							color: 0xe6d0ce,
							description: "seems you reconsidered"
						}]
					})
					else {
						m.delete()
						stateMsg.delete()
						embMsg.delete()
						edit(message, emb, prop, val)
					}
				})

				confirmation.on('end', async collected => {
					if (!collected || !collected.size || collected.size < 1) return message.channel.send({
						embeds: [{
							color: 0xe6d0ce,
							description: "time over... try again or reconsider"
						}]
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