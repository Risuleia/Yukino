const { ActivityType } = require("discord-api-types/v10")
const db = require('../db')

const status = async (client) => {

	const mariposa = await client.guilds.fetch('879726321155051530')
	
	const states = {
		0: {
			content: 'with mimi',
			type: ActivityType.Playing
		},
		// 1: {
		// 	content: 'with risu',
		// 	type: ActivityType.Playing
		// },
		1: {
			content: 'i love mimi <333',
			type: ActivityType.Playing
		},
		// 3: {
		// 	content: 'i love risu <333',
		// 	type: ActivityType.Playing
		// },
		2: {
			content: 'mimi\'s server',
			type: ActivityType.Watching
		},
		3: {
			content: 'mariposa',
			type: ActivityType.Competing
		},
		4: {
			content: `.gg/${mariposa.vanityURLCode}`,
			type: ActivityType.Streaming
		}
	}

	const length = Object.keys(states).length
	const rand = Math.floor(Math.random() * length)

	client.user.setActivity(states[rand].content, { type: states[rand].type, url: 'https://www.youtube.com/watch?v=VxgqVE4vv28' })
	
}

module.exports = status