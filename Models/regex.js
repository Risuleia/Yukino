const Regex = {
    id: /\d{17,20}/g,
    users: /<@!?(?<id>\d{17,20})>/g,
    user_specific: /^\d{17,20}$|^<@!?(?<id>\d{17,20})>$|^remove$/g,
    roles: /<@&(?<id>\d{17,20})>/g,
    role_specific: /^\d{17,20}$|^<@&(?<id>\d{17,20})>$|^remove$/g,
    channels: /<#(?<id>\d{17,20})>/g,
    channel_specific: /^\d{17,20}$|^<#(?<id>\d{17,20})>$|^remove$/g,
    emotes: /(<a?)?:?(\w+):?(\d{17,20})?>?/gm,
    hex: /^\#?[a-fA-F0-9]{6}$/g,
    img: /^https:\/{2}.+\/.+\.(png|jpg|jpeg|webp|gif)(\/|(\?\S*))?$/g
}

module.exports = Regex