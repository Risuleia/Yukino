const client = require('../index')

const placeholders = {
    user: (user, guild, chan) => {
        return user.toString()
    },
    user_tag: (user, guild, chan) => {
        return `${user.username}#${user.discriminator}`
    },
    user_name: (user, guild, chan) => {
        return user.username
    },
    user_nick: (user, guild, chan) => {
				const server = client.servers.get(guild.id)
				const member = server.members.cache.find(u => u.id === user.id)
        return member.displayName
    },
    user_avatar: (user, guild, chan) => {
        return user.avatarURL({ dynamic: true })
    },
    user_discrim: (user, guild, chan) => {
        return user.discriminator
    },
    user_id: (user, guild, chan) => {
        return user.id
    },
    user_displaycolor: (user, guild, chan) => {
				const server = client.servers.get(guild.id)
				const member = server.members.cache.find(u => u.id === user.id)
        return member.displayHexColor
    },
    server_name: (user, guild, chan) => {
        return guild.name
    },
    server_id: (user, guild, chan) => {
        return guild.id
    },
    server_icon: (user, guild, chan) => {
				const server = client.servers.get(guild.id)
        return guild.iconURL({ dynamic: true })
    },
    server_owner: (user, guild, chan) => {
				const server = client.servers.get(guild.id)
        const owner = client.users.cache.find(u => u.id === server.ownerId)
        return owner.toString()
    },
    server_owner_id: (user, guild, chan) => {
        return guild.ownerId
    },
    server_membercount: (user, guild, chan) => {
        return guild.memberCount
    },
    server_humancount: (user, guild, chan) => {
				const server = client.servers.get(guild.id)
        const humans = server.members.cache.filter(u => !u.user.bot)
        return humans.length
    },
    server_botcount: (user, guild, chan) => {
				const server = client.servers.get(guild.id)
        const bots = server.members.cache.filter(u => u.user.bot)
        return bots.length
    },
    server_rolecount: (user, guild, chan) => {
				const server = client.servers.get(guild.id)
        const roles = server.roles
        return roles.length
    },
    server_chancount: (user, guild, chan) => {
				const server = client.servers.get(guild.id)
        const channels = server.channels
        return channels.length
    },
    boostcount: (user, guild, chan) => {
        return guild.premiumSubscriptionCount
    },
    channel: (user, guild, chan) => {
        return chan.toString()
    },
    channel_id: (user, guild, chan) => {
        return chan.id
    }
}

module.exports = placeholders