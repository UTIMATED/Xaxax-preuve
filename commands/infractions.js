const moment = require('moment'),
    Discord = require('discord.js')
 
moment.locale('fr')
 
module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas le grade requis pour faire cela.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le soldat que vous chercher si vous voulez voir son casier judicaire !')
        if (!client.db.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn.')
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`**Total de warns :** ${client.db.warns[member.id].length}\n\n__**10 derniers warns**__\n\n${client.db.warns[member.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`))
    },
    name: 'infractions',
    guildOnly: true,
    help: {
        description: 'Voir les infractions d\'un membre',
        syntax: '<@membre>'
    }
}