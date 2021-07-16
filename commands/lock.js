const fs = require('fs')
    Discord = require('discord.js'),
    config = require('../config.json')
 
module.exports = {
    run: (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Vous n\'avez pas le grade requis pour faire cela !')
        const channel = message.mentions.channels.first() || message.channel
        if (client.db.lockedChannels.includes(channel.id)) return message.channel.send('Ce salon est déjà verrouillé.')
        client.db.lockedChannels.push(channel.id)
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send('Ce salon a été verrouillé !')
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[LOCK] ${channel.name}`)
            .addField('Salon', channel, true)
            .addField('Par', message.author, true)
            .setColor('RANDOM'))
    },
    name: 'lock',
    guildOnly: true,
    help: {
        description: 'Permet de verrouiller un salon',
        syntax: '#nom du salon'
    }
}