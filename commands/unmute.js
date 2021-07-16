const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas le grade requis pour faire cela !')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à libérer.')
        if (member.id === message.guild.ownerID) return message.channel.send('Je sais pas si ta remarqué, mais UTIMATED n\'est pas en prison😑')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas libérer ce soldat.')
        if (!member.manageable) return message.channel.send('../non.jpg')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie.'
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) return message.channel.send('Il n\'y a pas de muterole.')
        await member.roles.remove(muteRole)
        message.channel.send(`${member} a été unmute !`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[UNMUTE] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Soldat', member, true)
            .addField('Par', message.author, true)
            .addField('Raison:', reason, true)
            .setColor('RANDOM'))
    },
    name: 'unmute',
    guildOnly: true,
    help: {
        description: 'Permet de redonner la parole à quelq\'un',
        syntax: '<@membre>'
    }
}