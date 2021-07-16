const Discord = require('discord.js'),
    moment = require('moment')
 
module.exports = {
    run: message => {
        const role = message.mentions.roles.first()
        if (!role) return message.channel.send('Veuillez indiquez le grade que vous chercher pour avoir ses informations !')
        message.channel.send(new Discord.MessageEmbed()
            .addField('Rôle', role, true)
            .addField('Membres le possédant', role.members.size, true)
            .addField('Couleur', role.hexColor, true)
            .addField('Date de création', moment(role.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
            .addField('Affiché séparément', role.hoist ? 'Oui' : 'Non', true)
            .addField('Mentionnable', role.mentionable ? 'Oui' : 'Non', true)
            .setColor(role.hexColor))
    },
    name: 'roll-info',
    help: {
        description: 'Permet d\'avoir les informations de base d\'un rôle',
        syntax: '[question] | [Proposition n°1] | [Proposition n°2] '
    }
}    