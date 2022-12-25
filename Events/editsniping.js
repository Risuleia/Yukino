const client = require('../index');

  client.on('messageUpdate', async (oldMessage, newMessage) => {

		await oldMessage.fetch()
		await newMessage.fetch()
		
		if (oldMessage.channel.isDMBased()) return;
    
    if (newMessage.author.bot) return;

    if (newMessage.embeds.length > 0) return;
    
    let esnipes = client.esnipes.get(newMessage.channelId) || [];

    esnipes.unshift({
      newmsg: newMessage,
			oldmsg: oldMessage,
      image: newMessage.attachments.first()?.proxyURL || null,
      time: Date.now()
    });

    client.esnipes.set(newMessage.channelId, esnipes)
  })
