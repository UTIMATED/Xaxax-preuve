const fs = require('fs')
    Discord = require('discord.js'),
    config = require('../config.json')
 
module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas le grade requis pour faire cela !')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez indiquez le soldat à avertir !')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas avertir notre créateur')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas avertir ce soldat !')
        const reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send('Veuillez indiquer une raison.')
        if (!client.db.warns[member.id]) client.db.warns[member.id] = []
        client.db.warns[member.id].unshift({
            reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(`${member} a été warn. Raison: ${reason} !`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[WARN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Soldat', member, true)
            .addField('Par', message.author, true)
            .addField('Raison:', reason, true)
            .setColor('RANDOM'))
    },
    name: 'warn',
    guildOnly: true,
    help: {
        description: 'Donner un avertissement une personne',
        syntax: '<@membre> [raison]'
    }
}