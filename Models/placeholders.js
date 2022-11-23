const placeholders = {
    user: async function(user) {
        return user.toString()
    },
    user_tag: async function(user) {
        return `${user.username}#${user.discriminator}`
    },
    user_name: async function(user) {
        return user.username
    },
    user_nick: async function(user) {
        return user.displayName
    },
    user_avatar: async function(user) {
        return user.avatarURL({ dynamic: true })
    },
    user_discrim: async function(user) {
        return user.discriminator
    },
    user_id: async function(user) {
        return user.id
    },
    user_displaycolor: async function(user) {
        return user.displayHexColor
    },
    server_name: async function(guild) {
        return guild.name
    },
    server_id: async function(guild) {
        return guild.id
    },
    server_icon: async function(guild) {
        return guild.iconURL({ dynamic: true })
    },
    server_owner: async function(guild) {
        const owner = await guild.fetchOwner()
        return owner.toString()
    },
    server_owner_id: async function(guild) {
        return guild.ownerId
    },
    server_membercount: async function(guild) {
        return guild.memberCount
    },
    server_humancount: async function(guild) {
        const humans = await guild.members.cache.find(u => !u.user.bot)
        return humans.length
    },
    server_botcount: async function(guild) {
        const bots = await guild.members.cache.find(u => u.user.bot)
        return bots.length
    },
    server_rolecount: async function(guild) {
        const roles = await guild.roles
        return roles.size
    },
    server_channelcount: async function(guild) {
        const channels = await guild.channel
        return channels.size
    },
    boostcount: async function(guild) {
        return guild.premiumSubscriptionCount
    },
    channel: async function(chan) {
        return chan.toString()
    },
    channel_id: async function(chan) {
        return chan.id
    }
}