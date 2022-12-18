const client = require('../index');

client.on('messageReactionAdd', async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	
	if (reaction.message.channel.isDMBased()) return

  let rsnipes = client.rsnipes.get(reaction.message.channel.id) || [];

    rsnipes.unshift({
      msg: reaction.message,
      reaction: reaction.emoji,
      user: user,
      time: Date.now()
    });

    client.rsnipes.set(reaction.message.channel.id, rsnipes)
});
