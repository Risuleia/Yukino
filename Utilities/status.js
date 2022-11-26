const status = (client) => {
	
	const states = [
		'with mimi',
		'with risu',
		'i love mimi <333',
		'i love risu <333',
		'mimi\'s server'
	]

	const rand = Math.floor(Math.random() * states.length)
	const type = rand == 4 ? 'WATCHING' : 'PLAYING'
	
	client.user.setActivity(states[rand], { type: type })
	
}

module.exports = status