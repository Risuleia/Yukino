const placeholders = {
    user: async (user, guild, chan) => {
        return user.toString()
    },
    user_tag: async (user, guild, chan) => {
        return `${user.username}#${user.discriminator}`
    },
    user_name: async (user, guild, chan) => {
        return user.username
    },
    user_nick: async (user, guild, chan) => {
        return user.displayName
    },
    user_avatar: async (user, guild, chan) => {
        return user.avatarURL({ dynamic: true })
    },
    user_discrim: async (user, guild, chan) => {
        return user.discriminator
    },
    user_id: async (user, guild, chan) => {
        return user.id
    },
    user_displaycolor: async (user, guild, chan) => {
        return user.displayHexColor
    },
    server_name: async (user, guild, chan) => {
        return guild.name
    },
    server_id: async (user, guild, chan) => {
        return guild.id
    },
    server_icon: async (user, guild, chan) => {
        return guild.iconURL({ dynamic: true })
    },
    server_owner: async (user, guild, chan) => {
        const owner = await guild.fetchOwner()
        return owner.toString()
    },
    server_owner_id: async (user, guild, chan) => {
        return guild.ownerId
    },
    server_membercount: async (user, guild, chan) => {
        return guild.memberCount
    },
    server_humancount: async (user, guild, chan) => {
        const humans = await guild.members.cache.find(u => !u.user.bot)
        return humans.length
    },
    server_botcount: async (user, guild, chan) => {
        const bots = await guild.members.cache.find(u => u.user.bot)
        return bots.length
    },
    server_rolecount: async (user, guild, chan) => {
        const roles = await guild.roles
        return roles.size
    },
    server_channelcount: async (user, guild, chan) => {
        const channels = await guild.channel
        return channels.size
    },
    boostcount: async (user, guild, chan) => {
        return guild.premiumSubscriptionCount
    },
    channel: async (chan) => {
        return chan.toString()
    },
    channel_id: async (chan) => {
        return chan.id
    }
}

module.exports = placeholders