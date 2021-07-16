const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Vous n\'avez pas le grade requis pour faire cela !')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à renvoyer !')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas renvoyer notre créateur !.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas renvoyer ce membre !')
        if (!member.kickable) return message.channel.send('Je ne possède pas la possibilité de faire cela !')
        const reason = args.slice(1).join(' ') || 'Indiquez la raison de cette décision soldat !'
        await member.kick(reason)
        message.channel.send(`${member.user.tag} a été renvoyé !`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[KICK] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Soldat', member, true)
            .addField('Par', message.author, true)
            .addField('Raison:', reason, true)
            .setColor('RANDOM'))
    },
    name: 'kick',
    guildOnly: true,
    help: {
        description: 'Exclue un membre du serveur.',
        syntax: '<@membre> [raison]'
    }
}