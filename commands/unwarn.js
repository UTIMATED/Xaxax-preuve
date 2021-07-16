const fs = require('fs')
    Discord = require('discord.js'),
    config = require('../config.json')
 
module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas le grade requis pour faire cela !')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le soldat auquel vous voulez enlevez son avertissement !')
        if (!client.db.warns[member.id]) return message.channel.send('Ce soldat n\'a aucun avertissement.')
        const warnIndex = parseInt(args[1], 10) - 1
        if (warnIndex < 0 || !client.db.warns[member.id][warnIndex]) return message.channel.send('Cette avertissement n\'existe pas.')
        const { reason } = client.db.warns[member.id].splice(warnIndex, 1)[0]
        if (!client.db.warns[member.id].length) delete client.db.warns[member.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(`${member} a été unwarn pour ${reason} !`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[UNWARN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Soldat', member, true)
            .addField('Par', message.author, true)
            .addField('Warn supprimé', reason, true)
            .setColor('RANDOM'))
    },
    name: 'unwarn',
    guildOnly: true,
    help: {
        description: 'Permet d\'enlever un avertissement',
        syntax: '<@membre> [N° de son warn]'
    }
}