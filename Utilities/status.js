const { ActivityType } = require("discord-api-types/v10")

const status = (client) => {
	
	const states = {
		0: {
			content: 'with mimi',
			type: ActivityType.Playing
		},
		1: {
			content: 'with risu',
			type: ActivityType.Playing
		},
		2: {
			content: 'i love mimi <333',
			type: ActivityType.Playing
		},
		3: {
			content: 'i love risu <333',
			type: ActivityType.Playing
		},
		4: {
			content: 'mimi\'s server',
			type: ActivityType.Watching
		},
		5: {
			content: 'mariposa',
			type: ActivityType.Competing
		},
		6: {
			content: 'gg/iloveyou',
			type: ActivityType.Streaming
		},
		7: {
			content: 'Cosplaying in mariposa',
			type: ActivityType.Custom
		}
	}

	const length = Object.keys(states).length
	const rand = Math.floor(Math.random() * length)
	
	client.user.setActivity(states[rand].content, { type: states[rand].type })
	client.user.setStatus(rand == 6 ? 'streaming' : 'idle')
	
}

module.exports = status