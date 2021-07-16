const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')
    Discord = require('discord.js'),
    config = require('../config.json')
 
module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Vous n\'avez pas le grade requis pour faire ce sevr')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à exécuté.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas exécuté notre créateur !')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas exécuté ce soldat !')
        if (!member.bannable) return message.channel.send('Je ne veux pas faire cela !')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send('Veuillez indiquer une durée valide.')
        const reason = args.slice(2).join(' ') || 'Indiquez la raison de cette décision soldat'
        await member.ban({reason})
        message.channel.send(`${member.user.tag} a été banni pendant ${humanizeDuration(duration, {language: 'fr'})} !`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[BAN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Soldat', member, true)
            .addField('Par', message.author, true)
            .addField('Raison:', reason, true)
            .addField('Durée', humanizeDuration(duration, {language: 'fr'}), true)
            .setColor('RANDOM'))
        setTimeout(() => {
            message.guild.members.unban(member)
            message.channel.send(`${member.user.tag} a été réssucité.`)
        }, duration)
    },
    name: 'tempban',
    guildOnly: true,
    help: {
        description: 'Bannir temporairement un membre',
        syntax: '<@membre> [durée de bannissement]'
    }
}